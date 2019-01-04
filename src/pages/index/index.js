import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Picker } from '@tarojs/components'
import { AtButton, AtInput, AtForm,  AtCheckbox, Rate, AtTextarea, AtToast } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd   } from '../../actions/counter'
import { apiGetDissSelectApi, apiAddCompanyApi }  from '../../api/company'
import { EventUtil }  from '../../utils/utils'
import './index.scss'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '要倒闭了？'
  }
  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      num: '',
      isOpened: false,
      multiSelector: [],
      dissComplay: ['倒闭了>-。-<', '没倒闭', '快倒闭了', '运营的还挺好<-。->'],
      numComplay: ['30人左右', '70左右', '100左右', '300左右', '500左右','1000左右','20000左右'],
      selector: ['希望', '不希望'],
      selectorChecked: '',
      selfSelectorChecked: '',
      multiChecked: '',
      yearChecked: '',
      textarea: '',
      yearselector: ['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018', '2019'],
      checkboxOption: [],
      checkedList: [],
      infoMessage: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  namehandleChange = (value) => {
    console.log(value)
    this.setState({
      name: value
    })
  }
  numhandleChange = (e) => {
    this.setState({
      num: this.state.numComplay[e.detail.value]
    })
  }
  checkNumber = (theObj) => {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
      return true;
    }
    return false;
  }
  CheckAllhandleChange = (value) => {
    this.setState({
      checkedList: value
    })
  }
  onChangeselector = e => {
    this.setState({
      selectorChecked: this.state.dissComplay[e.detail.value]
    })
  }
  selfOnChangeselector = e => {
    this.setState({
      selfSelectorChecked: this.state.selector[e.detail.value]
    })
  }
  onChangemultiSelector = e => {
    this.setState({
      multiChecked: e
    })
  }
  yearOnChange() {
    this.setState({
      yearChecked: this.state.yearselector[e.detail.value]
    })
  }
  textareaChange(event) {
    this.setState({
      textarea: event.target.value
    })
  }
  onShareAppMessage() {
    console.log(1)
  }
  onSubmit (event) {
    if (!this.state.name || !this.state.num || !(this.state.checkedList.length > 0)) {
      this.message({
        isOpened: true,
        infoMessage: '多多少少添加一些<- 。 ->'
      })
      return false
    } else {
      let params = {
        name: this.state.name, number: this.laiulea(this.state.num), region: this.state.multiChecked, isGoOut: this.guolv(this.state.selectorChecked), hopeGoOut: this.hopeGuolv(this.state.selfSelectorChecked),
        existence: 0, diss: JSON.stringify(this.state.checkedList), talk: this.state.textarea, star: 0
      }
      apiAddCompanyApi(params).then(res => {
        if (res.data.result) {
          this.setState({
            name: ''
          })
          this.message({
            isOpened: true,
            infoMessage: res.data.msg
          })
        } else {
          this.message({
            isOpened: true,
            infoMessage: res.data.msg
          })
        }
      })
    }
  }
  message = (messageObj) => {
    this.setState(messageObj)
    setTimeout(() => {
      this.setState({
        isOpened: false
      })
    }, 2000)
  }
  guolv = (x) => {
    // selector: ['希望', '不希望'],
    if (x === '倒闭了>-。-<') {
      return 0
    } else if (x === '没倒闭') {
      return 1
    } else if (x === '快倒闭了') {
      return 2
    } else if (x === '运营的还挺好<-。->') {
      return 3
    } else {
      return 4
    }
  }
  hopeGuolv = (x) => {
    if (x === '希望') {
      return 0
    } else if (x === '不希望') {
      return 1
    }  else {
      return 2
    }
  }
  laiulea = (x) => {
    if (x === '30人左右') {
      return 0
    } else if (x === '70左右') {
      return 1
    } else if (x === '100左右') {
      return 2
    } else if (x === '300左右') {
      return 3
    } else if (x === '500左右') {
      return 4
    } else if (x === '1000左右') {
      return 5
    } else if (x === '20000左右') {
      return 6
    } else {
      return 7
    }
  }
  componentDidMount() {
    apiGetDissSelectApi().then(res => {
      let newArr = res.data.data.map(x => {
        return {
          value: Number(x.value),
          label: x.label
        }
      })
      this.setState({
        checkboxOption: newArr
      })
    })
  }
  render () {
    return (
      <View className='index'>
      <AtForm
        onSubmit={this.onSubmit.bind(this)}
        onReset={this.onReset.bind(this)}
      >
                <AtInput
            name='name'
            title='公司名称'
            className="comPlny  s"
            type='text'
            placeholder='请输入公司名'
            value={this.state.name}
            onChange={this.namehandleChange.bind(this)}
          />
        <AtInput
          name='comPlny'
          title='公司所在地：'
          className="comPlny"
          placeholder='请输入公司所在地'
          value={this.state.multiChecked}
          onChange={this.onChangemultiSelector.bind(this)}
        />
          <Picker mode='selector' className="pickerWrap s"  range={this.state.numComplay} onChange={this.numhandleChange}>
              <View className='picker'>
              请选择公司人数：{this.state.num}
              </View>
          </Picker>
          <Picker mode='selector' className="pickerWrap s"  range={this.state.dissComplay} onChange={this.onChangeselector}>
              <View className='picker'>
                公司倒闭了吗？：{this.state.selectorChecked}
              </View>
          </Picker>
          <Picker mode='selector' className="pickerWrap"  range={this.state.selector} onChange={this.selfOnChangeselector}>
              <View className='picker'>
                您希望公司倒闭吗？：{this.state.selfSelectorChecked}
              </View>
          </Picker>
          <AtCheckbox
            options={this.state.checkboxOption}
            selectedList={this.state.checkedList}
            onChange={this.CheckAllhandleChange.bind(this)}
          />
          <AtTextarea
            value={this.state.textarea}
            onChange={this.textareaChange.bind(this)}
            maxLength={200}
            placeholder='你想对这个公司说什么...'
          />
          <AtButton className="btn" formType='submit'>提交</AtButton>
          {/* <AtButton formType='reset'>重置</AtButton> */}
      </AtForm>
      <AtToast
        isOpened={this.state.isOpened}
        text={this.state.infoMessage}
        duration={2000}></AtToast>
          {/* <Button className='add_btn' onClick={this.props.add}>+</Button>
          <Button className='dec_btn' onClick={this.props.dec}>-</Button>
          <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
          <View><Text>{this.props.counter.num}</Text></View>
          <View><Text>Hello, World</Text></View> */}
      </View>
    )
  }
}

export default Index
