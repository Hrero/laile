import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Picker } from '@tarojs/components'
import { AtButton, AtInput, AtForm,  AtCheckbox, Rate, AtTextarea, AtToast, AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd   } from '../../actions/counter'
import { apiAddStarApi, apiGetRankingListApi }  from '../../api/company'
import path  from '../../utils/host'
console.log(path, '-----')

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
      list: [],
      status: false,
      isOpened: false,
      infoMessage: ''
    }
  }
  getMaxList = () => {
    apiGetRankingListApi().then(res => {
      this.setState({
        list: res.data
      })
    })
  }
  handleClick(x) {
    apiAddStarApi({id: Number(x.id), star: Number(++x.star), openid: wx.getStorageSync('openid')}).then(res => {
      if (res.data.result) {
        this.getMaxList()
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
  message = (messageObj) => {
    this.setState(messageObj)
    setTimeout(() => {
      this.setState({
        isOpened: false
      })
    }, 2000)
  }
  isGoOut = (x) => {
    if (x == 0) {
      return '倒闭了>-。-<'
    } else if (x == 1) {
      return '没倒闭'
    } else if (x == 2) {
      return '快倒闭了'
    } else if (x == 3) {
      return '运营的还挺好<-。->'
    } else {
      return '不知道倒没倒闭'
    }
  }
  componentDidShow() {
    this.getMaxList()
  }
  componentDidMount() {
    this.getMaxList()
  }
  render () {
    console.log(this.state.status)
    return (
      <View className='index'>
      <View className="picks">排行榜(心动不如行动)</View>
      <AtList>
        {
          this.state.list.data.map((x, i) => {
            return <AtListItem title={x.name} extraText={`+${String(x.star)}`}
            key={`a${x}`}
            disabled={this.state.status}
            note={this.isGoOut(x.isGoOut)}
            onClick={this.handleClick.bind(this,x)} />
          })
        }
      </AtList>
      <AtToast
        isOpened={this.state.isOpened}
        text={this.state.infoMessage}
        duration={2000}></AtToast>
      </View>
    )
  }
}

export default Index
