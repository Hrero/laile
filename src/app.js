import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import path  from './utils/host'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/logs/logs'
    ], 
    tabBar: {
      list: [
        {
          "pagePath": "pages/index/index",
          "iconPath": "images/trash.png",
          "text": "填点"
        },
        {
          "pagePath": "pages/logs/logs",
          "iconPath": "images/record.png",
          "text": "榜单"
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    this.getToken()
  }
  getToken = () => {
    return new Promise((resolve, reject) => {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            //发送res.code 到后台
            wx.request({
              url: `${path.dev}/api/login`,
              method: 'POST',
              data: {
                code: res.code
              },
              success(res) {
                //成功返回数据后，将token值存储到localStorage中
                wx.setStorage({
                  key: 'yerlLocalToken',
                  data: res.data.token
                });
                resolve()
              },
              fail() {
                reject();
              }
            })
          }
        }
      })
    })
  }
  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
