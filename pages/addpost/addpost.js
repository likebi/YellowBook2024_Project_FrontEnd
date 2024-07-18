Page({

  /**
   * 页面的初始数据s
   */
  data: {
    arrowl: '<',
    arrowr: '>',
    plus: '/static/plus-icon.png',
    htag: '/static/htag.png',
    location: '/static/position.png',
    images: [] // 用于存储已上传的图片
  },

  // 返回首页
  onBack() {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  },

  // 添加图片
  addImage() {
    const that = this;
    wx.chooseImage({
      count: 4 - that.data.images.length, // 限制最多选择9张
      success(res) {
        const newImages = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(newImages) // 添加新图片
        });
      },
    });
  },

  // 提交笔记
  submitPost() {
    // 处理发布逻辑
    console.log('发布内容:', this.data.images);
  }
});
