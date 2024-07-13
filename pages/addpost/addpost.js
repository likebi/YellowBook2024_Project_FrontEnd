// pages/addpost/addpost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrowl:'<',
    arrowr:'>',
    plus:'/static/plus-icon.png',
    htag:'/static/htag.png',
    location:'/static/position.png'
  },
  onBack() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})