import Taro from '@tarojs/taro'
import path  from '../utils/host'

export function apiGetDissSelectApi (data) { // 吐槽列表
    return Taro.request({
        url: `${path.dev}/company/getDissSelect`,
        method: 'post',
        data: data
    })
}

export function apiAddCompanyApi (data) { // 添加公司列表
    return Taro.request({
        url: `${path.dev}/company/addCompany`,
        method: 'post',
        data: data
    })
}

export function apiAddStarApi (data) { // 点赞
    // console.log(trim(qs.stringify(data)))
    return Taro.request({
        url: `${path.dev}/company/addStar`,
        method: 'post',
        data: data
    })
}

export function apiGetRankingListApi (data) { // 获取列表
    return Taro.request({
        url: `${path.dev}/company/getRankingList`,
        method: 'post',
        data: data
    })
}

export function usersLoginApi (data) { // 用户登录
    return Taro.request({
        url: `${path.dev}/users/login`,
        method: 'post',
        data: data
    })
}
