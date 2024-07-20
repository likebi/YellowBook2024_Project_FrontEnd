Page({
  data: {
    arrowl: '<',
    arrowr: '>',
    plus: '/static/plus-icon.png',
    htag: '/static/htag.png',
    location: '/static/position.png',
    images: [] // 用于存储已上传的图片
  },

  onBack() {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  },

  addImage() {
    const that = this;
    wx.chooseImage({
      count: 4 - that.data.images.length, // 限制最多选择4张
      success(res) {
        const newImages = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(newImages) // 添加新图片
        });
      },
    });
  },

  submitPost() {
    const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token

    if (!token) {
      console.error('未找到授权 token');
      return;
    }

    const title = ''; // 从用户输入中获取
    const content = ''; // 从用户输入中获取
    const tag = ''; // 从用户输入中获取
    const location = ''; // 从用户输入中获取

    wx.request({
      url: 'http://localhost:3000/userpost', // 替换为你后端的帖子创建接口
      method: 'POST',
      header: {
        'Authorization': token// 设置授权头
      },
      data: {
        title: title,
        content: content,
        image_url: this.data.images,
        tag: tag,
        location: location
      },
      success: function (res) {
        console.log('帖子发布成功', res.data);
      },
      fail: function (error) {
        console.log('帖子发布失败', error);
      }
    });
  }
});
