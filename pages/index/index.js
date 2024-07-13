Page({
  data: {
    demoText1: 'https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient',
    demoText2: 'https://th.bing.com/th/id/R.496ccc48796a3ce6fbcdd0173436c3da?rik=aLk8AbZezYqp6g&riu=http%3a%2f%2fwww.gjlysy.com%2fupload%2fimage%2f20190918%2f15687778356989439.jpg&ehk=i3eyZiPsIs3qi7QZB0KQTq1bdwKt%2f9F%2fewvOm%2fnYakE%3d&risl=&pid=ImgRaw&r=0',
    demoText3: 'https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient',
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
    userImage: '/static/me.png',
    nickname: 'wechat_user',
    current: 0,
    Arrow1: "<",
    Arrow2: ">"
  },

  onLoad: function () {
    this.setData({
      background: [this.data.demoText1, this.data.demoText2, this.data.demoText3]
    });
    this.getUserInfo();
  },

  nextImage: function () {
    let currentPageIndex = this.data.current;
    currentPageIndex = (currentPageIndex + 1) % this.data.background.length;
    this.setData({
      current: currentPageIndex
    });
  },

  prevImage: function () {
    let currentPageIndex = this.data.current;
    currentPageIndex = (currentPageIndex - 1 + this.data.background.length) % this.data.background.length;
    this.setData({
      current: currentPageIndex
    });
  },

  onChooseAvatar(e) {
    console.log(e);
    this.setData({
      userImage: e.detail.avatarUrl
    });
    this.saveUserInfo();
  },



  onChooseNickname(e) {
    console.log(e);
    this.setData({
      nickname: e.detail.value
    });
    this.saveUserInfo();
  },

  saveUserInfo() {
    wx.setStorage({
      key: 'userInfo',
      data: {
        userImage: this.data.userImage,
        nickname: this.data.nickname
      }
    });
  },

  getUserInfo() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.setData({
          userImage: res.data.userImage,
          nickname: res.data.nickname
        });
      }
    });
  }
});

