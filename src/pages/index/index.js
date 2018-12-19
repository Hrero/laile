import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Picker } from '@tarojs/components'
import { AtButton, AtInput, AtForm,  AtCheckbox, Rate, AtTextarea } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd   } from '../../actions/counter'

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
    navigationBarTitleText: '首页'
  }
  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      num: '',
      multiSelector: [['a','b'], ['c','d']],
      selector: ['希望', '不希望'],
      selectorChecked: '',
      multiChecked: '',
      yearChecked: '',
      textarea: '',
      yearselector: ['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018', '2019'],
      checkboxOption: [{
        value: 'list1',
        label: 'iPhone X'
      },{
        value: 'list2',
        label: 'HUAWEI P20'
      }],
      checkedList: []
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  namehandleChange (value) {
    console.log(value)
    this.setState({
      name: value
    })
  }
  numhandleChange (value) {
    this.setState({
      num: value
    })
  }
  onChangeselector = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }
  onChangemultiSelector = e => {
    let text = this.state.multiSelector[0][e.detail.value[0]] + '&' + this.state.multiSelector[1][e.detail.value[1]]
    this.setState({
      multiChecked: text
    })
  }
  yearOnChange() {
    this.setState({
      yearChecked: this.state.yearselector[e.detail.value]
    })
  }
  textareaChange() {

  }
  onSubmit (event) {
    console.log(event.detail.value)
  }
  onReset (event) {
    console.log(event)
  }
  componentDidMount() {
    Taro.request({
      url: 'http://localhost:8088/api/addCompany',
      method: "POST",
      data: {name: 1, number: 1, region: 1, isGoOut: 1, hopeGoOut: 2, existence: 3, diss: 4, talk: 4, star: 5}
    }).then(res => console.log(res.data))
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
            type='text'
            placeholder='请输入公司名'
            value={this.state.name}
            onChange={this.namehandleChange.bind(this)}
          />
          <AtInput
            name='num'
            title='公司人数'
            type='number'
            placeholder='请输入公司人数'
            value={this.state.num}
            onChange={this.numhandleChange.bind(this)}
          />
          <Picker mode='multiSelector' range={this.state.multiSelector} onChange={this.onChangemultiSelector}>
                <View className='picker'>
                  公司所在地区：{this.state.multiChecked}
                </View>
          </Picker>
          <Picker mode='selector' range={this.state.selector} onChange={this.onChangeselector}>
                <View className='picker'>
                  公司倒闭了吗？：{this.state.selectorChecked}
                </View>
          </Picker>
          <Picker mode='selector' range={this.state.selector} onChange={this.onChangeselector}>
                <View className='picker'>
                  您希望公司倒闭吗？：{this.state.selectorChecked}
                </View>
          </Picker>
          <View className='page-section'>
            <Text>时间选择器</Text>
            <View>
              <Picker mode='selector' range={this.state.yearselector} onChange={this.yearOnChange}>
                    <View className='picker'>
                      所在公司年？：{this.state.yearChecked}
                    </View>
              </Picker>
            </View>
          </View>
          <AtCheckbox
            options={this.state.checkboxOption}
            selectedList={this.state.checkedList}
            onChange={this.handleChange.bind(this)}
          />
          <AtTextarea
            value={this.state.textarea}
            onChange={this.textareaChange.bind(this)}
            maxLength={200}
            placeholder='你想对这个公司说什么...'
          />
          <AtButton className="btn" formType='submit'>提交</AtButton>
          <AtButton formType='reset'>重置</AtButton>
          {/* <Button className='add_btn' onClick={this.props.add}>+</Button>
          <Button className='dec_btn' onClick={this.props.dec}>-</Button>
          <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
          <View><Text>{this.props.counter.num}</Text></View>
          <View><Text>Hello, World</Text></View> */}
        </AtForm>
      </View>
    )
  }
}

export default Index
