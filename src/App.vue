<template>
  <div>
      
  </div>
</template>

<script>
import config from './config'
import qcloud from 'wafer2-client-sdk'
import { ShowSuccess } from '@/utils/utils'
export default {
  data () {
    return {}
  },
  methods: {
    doLogin: function (e) {
      let Status = wx.getStorageSync('userInfo')
      if (!Status) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userInfo) {
            console.log('登录成功', userInfo)
            wx.setStorageSync('userInfo', userInfo)
            ShowSuccess('登录成功')
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      }
    }
  },
  created () {
    // this.doLogin();
  }
}
</script>

<style lang="scss">
.text-footer{
  text-align:center;
  font-size:12px;
}
.text-primary{
  color:#EA5A49;
}
.btn {
  color:white;
  background:#EA5A49;
  margin-bottom:10rpx;
  padding-left:15rpx;
  padding-right:15rpx;
  border-radius:2rpx;
  font-size:16rpx;
  line-height:40rpx;
  height:40rpx;
  width:100%;
  :active{
    background:#FA5A49;
  }
}
</style>
