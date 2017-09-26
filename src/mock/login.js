import { param2Obj } from 'utils'

const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    username: 'admin',
    introduction: '我是超级管理员',
    name: '超级管理员小潘',
    serviceId: '001'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    username: 'editor',
    introduction: '我是编辑',
    name: '普通编辑小张',
    serviceId: '002'

  },
  developer: {
    role: ['develop'],
    token: 'develop',
    username: 'develop',
    introduction: '我是开发',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '工程师小王',
    serviceId: '003'
  }
}

export default {
  loginByEmail: config => {
    const {email} = JSON.parse(config.body)
    return userMap[email.split('@')[0]]
  },
  loginByUsername: config => {
    const {username} = JSON.parse(config.body)
    return userMap[username.split('@')[0]]
  },
  getInfo: config => {
    const {token} = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      // return Promise.reject('a')
    }
  },
  logout: () => 'success'
}
