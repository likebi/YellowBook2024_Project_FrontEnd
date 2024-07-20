Page({
  data: {
    arrowl: '<',
    arrowr: '>',
    plus: '/static/plus-icon.png',
    htag: '/static/htag.png',
    location: '/static/position.png',
    images: [], // 用于存储已上传的图片
    title: '',
    content: '',
    selectedLocation: '',
    selectedTag: ''
  },

  onLoad() {
    console.log('Page loaded');
    // 加载已保存的图片
    const savedImages = wx.getStorageSync('Post_image') || [];
    const savedTitle = wx.getStorageSync('Post_title') || '';
    const savedContent = wx.getStorageSync('Post_content') || '';
    const savedLocation = wx.getStorageSync('Post_location') || '';
    const savedTag = wx.getStorageSync('Post_tag') || '';
    this.setData({
      images: savedImages,
      title: savedTitle,
      content: savedContent,
      selectedLocation: savedLocation,
      selectedTag: savedTag
    });
  },

  updateTitle(e) {
    this.setData({
      title: e.detail.value
    }, () => {
      this.savePost_Title(); // 更新本地存储
    });
  },

  updateContent(e) {
    this.setData({
      content: e.detail.value
    }, () => {
      this.savePost_Content(); // 更新本地存储
    });
  },

  updateLocation(e) {
    this.setData({
      selectedLocation: e.detail.value
    }, () => {
      this.savePost_Location(); // 更新本地存储
    });
  },

  updateTag(e) {
    this.setData({
      selectedTag: e.detail.value
    }, () => {
      this.savePost_Tag(); // 更新本地存储
    });
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

  // 添加图片
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

  // 提交笔记
  submitPost() {
    const that = this;
    wx.request({
      url: 'https://your-backend-url.com/api/savePost', // 替换为你的后端接口
      method: 'POST',
      data: {
        images: that.data.images, // 直接发送数组
        title: that.data.title,
        content: that.data.content,
        location: that.data.selectedLocation,
        tag: that.data.selectedTag
      },
      success(res) {
        console.log('发布成功:', res.data);
        // 处理发布成功后的逻辑
      },
      fail(err) {
        console.log('发布失败:', err);
        // 处理发布失败后的逻辑
      }
    });
  }
});
