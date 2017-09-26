import Mock from 'mockjs'
import loginAPI from './login'
import seller from './seller'

// 登录相关
Mock.mock(/\/login\/loginbyusername/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// 系统管理

Mock.mock(/\/seller\/getSeller/, 'post', seller.getSeller())
Mock.mock(/\/seller\/getGoodsList/, 'post', seller.getGoodsList())
Mock.mock(/\/seller\/getRatingsList/, 'post', seller.getRatingsList())

export default Mock
