<template>
    <div class="id">
        <div class="container">
            <div class="userInfo">
                <img :src="userInfo.avatarUrl" alt="">
                <p v-if="ShowStatus">{{userInfo.nickName}}</p>
                <button v-else class="btnFalse" open-type="getUserInfo" @getuserinfo="doLogin">点击登录</button>
            </div>
            <YearProgree></YearProgree>
            <button v-if="userInfo.openId" @click="scanBook" class="btn">添加图书</button>
        </div>
    </div>
</template>
<script>
import config from '../../config'
import qcloud from 'wafer2-client-sdk'
import { ShowSuccess,post,ShowModal } from '@/utils/utils'
import YearProgree from '@/components/YearProgress'
export default {
  data () {
    return {
      userInfo: {
        avatarUrl: '../../../static/img/unlogin.jpg',
        nickName: '点击登录'
      },
      ShowStatus: false
    }
  },

  onShow () {
    if (wx.getStorageSync('userInfo')) {
      this.userInfo = wx.getStorageSync('userInfo')
      this.ShowStatus = true
    }
  },
  methods: {
    async addBook(isbn){
      const res = await post('/weapp/addBook',{
        isbn,
        openid:this.userInfo.openId,
      })
      ShowModal('添加成功',`${res.title}添加成功`);
      // if(res.code===0&&res.data.title){
      //   ShowSuccess("添加成功",`${res.data.title}添加成功`);
      // }
    },
    scanBook () {
      let self = this;
      wx.scanCode({
        success (res) {
          if(res.result){
            console.log(res.result)
            self.addBook(res.result);
          }
        }
      })
    },
    doLogin: function (e) {
      let self = this
      let Status = wx.getStorageSync('userInfo')
      if (!Status) {
        wx.showLoading({
          title: '登录中...'
        })
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userInfo) {
            wx.hideLoading()
            console.log('登录成功', userInfo)
            wx.setStorageSync('userInfo', userInfo)
            ShowSuccess('登录成功')
            self.userInfo = userInfo
            self.ShowStatus = true
            console.log(self.userInfo)
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      }
    }
  },
  components: {
    YearProgree
  }
}
</script>
<style lang="scss">
.container {
  padding: 0rpx 30rpx;
  .userInfo {
    margin-top: 100rpx;
    text-align: center;
    img {
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
  .btnL {
    margin-bottom: 20px;
  }
}
.btn {
  color: white;
  background: #ea5a49;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%;
  margin-top: 30rpx;
}
.bth:active {
  background: #fa5a49;
}
</style>

