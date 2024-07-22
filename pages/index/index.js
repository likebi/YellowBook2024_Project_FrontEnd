Page({
  data: {
    latitude: null,
    longitude: null,
    city: '',

    demoText1: 'https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient',
    demoText2: 'https://th.bing.com/th/id/R.496ccc48796a3ce6fbcdd0173436c3da?rik=aLk8AbZezYqp6g&riu=http%3a%2f%2fwww.gjlysy.com%2fupload%2fimage%2f20190918%2f15687778356989439.jpg&ehk=i3eyZiPsIs3qi7QZB0KQTq1bdwKt%2f9F%2fewvOm%2fnYakE%3d&risl=&pid=ImgRaw&r=0',
    demoText3: 'https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient',
    background: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    nickname: 'wechat_user',
    current: 0,
    Arrow1: "<",
    Arrow2: ">",
    namePosition: '',
    dropdownVisible: false,
    options: [
      { label: '发布', value: '/pages/addpost/addpost' },
      { label: '选项2', value: 'page2' },
      { label: '选项3', value: 'page3' }
    ],
    items: [],
  },

  // 使用 wx.request 发送请求
  fetchUserData() {
    const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token

    if (!token) {
      console.error('未找到授权 token');
      return;
    }
      wx.request({
        url: 'http://localhost:3000/items', // 你的后端 API 地址
        method: 'GET',
        header: {
          'Authorization': token
        },
        success: (res) => {
          if (res.data.code === 200) {
            // 将返回的数据设置到 page 的 items 数据中
            this.setData({
              items: res.data.data
            });
          } else {
            console.error('获取数据失败:', res.data.msg);
          }
        },
        fail: (err) => {
          console.error('请求失败:', err);
        }
      });
    },
    

  onOptionSelect(e) {
    const value = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: value
    });
    this.setData({
      dropdownVisible: false
    });
  },



  navigateToContentPage: function(event) {
    const id = event.currentTarget.dataset.id; 
    console.log(`${id}`)
    wx.navigateTo({
      url: `/pages/contentpage/contentpage?id=${id}`,
    });
},

  onLoad: function () {
    this.setData({
      background: [this.data.demoText1, this.data.demoText2, this.data.demoText3]
    });
    this.getUserInfo();
    this.getUserLocation();
    this.fetchUserData();  // 调用 fetchUserData 方法
  },

  nextImage: function () {
    let currentPageIndex = (this.data.current + 1) % this.data.background.length;
    this.setData({ current: currentPageIndex });
  },

  prevImage: function () {
    let currentPageIndex = (this.data.current - 1 + this.data.background.length) % this.data.background.length;
    this.setData({ current: currentPageIndex });
  },

  like_post: function (e) {
    const index = e.currentTarget.dataset.index;
    const items = this.data.items;
    items[index].isLiked = !items[index].isLiked;
    items[index].loveImage = items[index].isLiked ? '../../static/love.png' : '../../static/love2.png';

    this.setData({ items });
  },

  getUserInfo() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.setData({
          userImage: res.data.userImage,
          nickname: res.data.nickname
        });
      },
      fail: () => {
        console.log('获取用户信息失败');
      }
    });
  },

  //获取用户位置授权
  getUserLocation() {
    const that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          // 用户已经授权，可以直接调用 getLocation 获取位置信息
          that.getLocation();
        } else {
          // 未授权，主动发起授权请求
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 授权成功，调用 getLocation 获取位置信息
              that.getLocation();
            },
            fail() {
              // 授权失败，处理未授权情况
              wx.showModal({
                title: '授权失败',
                content: '需要授权位置信息才能正常使用，请在设置中开启授权',
                showCancel: false
              });
            }
          });
        }
      }
    });
  },

  //授权后用户位置返回
  getLocation() {
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log('用户位置:', res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        // 将位置存储到全局数据中
        getApp().globalData.userLocation = {
          latitude: res.latitude,
          longitude: res.longitude
        };
        // 调用方法获取城市名称
        that.getCity(res.latitude, res.longitude);
      },
      fail(err) {
        console.error('获取位置信息失败:', err);
        wx.showModal({
          title: '获取位置信息失败',
          content: '无法获取位置信息，请检查定位服务是否开启',
          showCancel: true,
        });
      }
    });
  },

  getCity(latitude, longitude) {
    const that = this;
    const key = 'CRPBZ-XCN3L-H2RPB-MUXAK-2SMP3-V4FWI'; // 替换为您申请的腾讯位置服务密钥
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}&get_poi=0`;

    wx.request({
      url: url,
      success: (res) => {
        console.log('城市信息:', res.data);
        if (res.data.status === 0) {
          const city = res.data.result.address_component.city;
          that.setData({
            namePosition: city
          });
        } else {
          wx.showToast({
            title: '获取城市信息失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '请求城市信息失败',
          icon: 'none'
        });
      }
    });
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

  toggleDropdown() {
    this.setData({ dropdownVisible: !this.data.dropdownVisible });
  },

  onOptionSelect(e) {
    const value = e.currentTarget.dataset.value;
    wx.navigateTo({ url: value });
    this.setData({ dropdownVisible: false });
  },
});
