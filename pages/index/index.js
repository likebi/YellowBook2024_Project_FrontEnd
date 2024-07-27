Page({
  data: {
    latitude: null,
    longitude: null,
    city: '',
    demoText1: 'https://dimg04.c-ctrip.com/images/10040h000000904y8357D_C_1600_1200.jpg',
    demoText2: 'https://dimg04.c-ctrip.com/images/10061g000001h2g38517E_R_1600_10000.jpg',
    demoText3: 'https://dimg04.c-ctrip.com/images/10051g000001hmtfy2BD2_C_1600_1200.jpg',
    background: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    current: 0,
    Arrow1: "<",
    Arrow2: ">",
    namePosition: '',
    options: [
      { label: '发布', value: '/pages/addpost/addpost'},
    ],
    items: [],
    page: 1 // 初始化页数为1
  },
  // Method to navigate to the link
  navigateToLink(event) {
    const url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/webpage2/webpage2?url=${encodeURIComponent(url)}`, 
      fail: (err) => {
        console.error('Navigation failed:', err);
      }
    });
  },
  onShow: function () {
    this.getUserInfo();
    this.fetchUserData(); // 调用获取数据的函数
  },

  fetchUserData() {
    const token = wx.getStorageSync('userToken');
    const { page } = this.data;
    let Uid = wx.getStorageSync('Uid');
    console.log('Fetching data for userId:', Uid); // Debugging
    if (!Uid) {
      console.error('未找到用户 ID');
      return;
    }
    if (!token) {
      console.error('未找到授权 token');
      return;
    }

    wx.request({
      url: `http://localhost:3000/firstPages/items?page=${page}&userId=${Uid}`,
      method: 'GET',
      header: {
        'Authorization': token
      },
      success: (res) => {
        console.log('Response data:', res.data); // Debugging
        if (res.data.code === 200) {
          if (Array.isArray(res.data.data)) {
            this.setData({
              items: this.data.items.concat(res.data.data || []),
              page: page + 1
            });
            wx.stopPullDownRefresh(); // 停止当前的下拉刷新
          } else {
            console.error('返回的数据格式不正确:', res.data.data);
            wx.stopPullDownRefresh(); // 停止当前的下拉刷新
          }
        } else {
          console.error('获取数据失败:', res.data.msg);
          wx.stopPullDownRefresh(); // 停止当前的下拉刷新
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.stopPullDownRefresh(); // 停止当前的下拉刷新
      }
    });
  },

  onPullDownRefresh() {
    console.log('触发了 onPullDownRefresh');
    this.setData({ page: 1, items: [] }, () => {
      this.fetchUserData();
    });
  },

  onOptionSelect(event) {
    const { value } = event.currentTarget.dataset;
    wx.navigateTo({
      url: value,
      success: (res) => {
        console.log('Navigation successful:', res);
      },
      fail: (err) => {
        console.error('Navigation failed:', err);
      },
    });
    // Close the dropdown menu after selection
    this.setData({
      dropdownVisible: false
    });
  },

  navigateToContentPage: function (event) {
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
    const app = getApp();
    app.checkUserToken(() => {
      this.fetchUserData();
    });
  },

  nextImage: function () {
    let currentPageIndex = (this.data.current + 1) % this.data.background.length;
    this.setData({ current: currentPageIndex });
  },

  prevImage: function () {
    let currentPageIndex = (this.data.current - 1 + this.data.background.length) % this.data.background.length;
    this.setData({ current: currentPageIndex });
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

  onReachBottom() {
    console.log('触发了 onReachBottom');
    this.fetchUserData();  // 调用 fetchUserData 方法
  },

  //获取用户位置授权
  getUserLocation() {
    const that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          that.getLocation();
        } else {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              that.getLocation();
            },
            fail() {
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

  getLocation() {
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        getApp().globalData.userLocation = {
          latitude: res.latitude,
          longitude: res.longitude
        };
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
    const key = 'CRPBZ-XCN3L-H2RPB-MUXAK-2SMP3-V4FWI';
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}&get_poi=0`;

    wx.request({
      url: url,
      success: (res) => {
        console.log('位置：',res);
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
  }
});
