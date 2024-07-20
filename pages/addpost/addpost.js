Page({
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

  // 保存图片到本地存储
  savePost_image() {
    wx.setStorageSync('Post_image', this.data.images);
  },

  savePost_Title() {
    wx.setStorageSync('Post_title', this.data.title);
  },

  savePost_Content() {
    wx.setStorageSync('Post_content', this.data.content);
  },

  savePost_Location() {
    wx.setStorageSync('Post_location', this.data.selectedLocation);
  },

  savePost_Tag() {
    wx.setStorageSync('Post_tag', this.data.selectedTag);
  },

  // 保存图片到本地存储
  savePost_image() {
    wx.setStorageSync('Post_image', this.data.images);
  },

  savePost_Title() {
    wx.setStorageSync('Post_title', this.data.title);
  },

  savePost_Content() {
    wx.setStorageSync('Post_content', this.data.content);
  },

  savePost_Location() {
    wx.setStorageSync('Post_location', this.data.selectedLocation);
  },

  savePost_Tag() {
    wx.setStorageSync('Post_tag', this.data.selectedTag);
  },

  addImage() {
    const that = this;
    wx.chooseImage({
      count: 4 - that.data.images.length, // 限制最多选择4张
      success(res) {
        const newImages = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(newImages) // 添加新图片
        }, () => {
          that.savePost_image(); // 保存图片到本地存储
        });
      },
    });
  },

  // 删除图片
  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images: images
    }, () => {
      this.savePost_image(); // 保存修改后的图片数组到本地存储
    });
  },

  handleInput(e){
    console.log(e);
    this.setData({
      title: e.detail.value
    });
    this.savePost_Title();
  },

  handleContent(e){
    console.log(e);
    this.setData({
      content: e.detail.value
    });
    this.savePost_Content();
  },

  submitPost() {
    const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token

    if (!token) {
      console.error('未找到授权 token');
      return;
    }

    wx.request({
      url: 'http://localhost:3000/userpost', // 替换为你后端的帖子创建接口
      method: 'POST',
      header: {
        'Authorization': token// 设置授权头
      },
      data: {
        images: this.data.images, // 直接发送数组
        title: this.data.title,
        content: this.data.content,
        location: this.data.selectedLocation,
        tag: this.data.selectedTag
      },
      success(res) {
        console.log('发布成功:', res.data);
        // 处理发布成功后的逻辑
      },
      fail(err) {
        console.log('发布失败:', err);
        // 处理发布失败后的逻辑
      }
    });;
  }
});
