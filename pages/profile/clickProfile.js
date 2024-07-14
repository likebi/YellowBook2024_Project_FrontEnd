Page({
  data: {
    back_button: "<",
    to_button: ">",
    userImage: '/static/me.png',
    nickname: '',
    Uid: '',
    Bio: 'alibaba is a good boy',
    currentLength: 0,
    gender: '请选择性别',
  },
  
  onLoad(options) {
    this.getUserInfo(); // Load user info when the page is loaded
  },
  
  onShow() {
    this.getUserInfo(); // Update user info each time the page is shown
  },



  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      userImage: userInfo.userImage || this.data.userImage,
      nickname: userInfo.nickname || this.data.nickname,
      Uid: userInfo.Uid || this.data.Uid,
      gender: userInfo.gender || this.data.gender,
    });
  },

  saveUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    userInfo.userImage = this.data.userImage;
    userInfo.nickname = this.data.nickname;
    userInfo.Uid = this.data.Uid;
    userInfo.backgroundImage=this.data.backgroundImage,

    wx.setStorageSync('userInfo', userInfo); // Save the updated user info
  },

  onChooseAvatar: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          userImage: res.tempFilePaths[0] // Set the chosen image path
        });
        this.saveUserInfo(); // Save the updated user info
      },
      fail: (err) => {
        console.error(err); // Handle errors
      }
    });
  },
});