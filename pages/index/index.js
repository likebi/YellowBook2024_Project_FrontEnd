Page({
  data: {
    latitude: null,
    longitude: null,
    city: '',
    demoText1: 'https://ts1.cn.mm.bing.net/th/id/R-C.a625b2ee7fd73c912f71284e7217ddb7?rik=HP07hFcTWbVOYg&riu=http%3a%2f%2ftraveldigg.com%2fwp-content%2fuploads%2f2016%2f08%2fLangkawi-Beach-Kedah-Malaysia.jpg&ehk=7meom5G62Lca%2bUWMjwHv0jknwXAAeRrV%2bjRrhzl5XT4%3d&risl=&pid=ImgRaw&r=0',
    demoText2: 'https://th.bing.com/th/id/R.496ccc48796a3ce6fbcdd0173436c3da?rik=aLk8AbZezYqp6g&riu=http%3a%2f%2fwww.gjlysy.com%2fupload%2fimage%2f20190918%2f15687778356989439.jpg&ehk=i3eyZiPsIs3qi7QZB0KQTq1bdwKt%2f9F%2fewvOm%2fnYakE%3d&risl=&pid=ImgRaw&r=0',
    demoText3: 'https://hariannusantara.com/wp-content/uploads/2019/06/gambar-pemandangan-indonesia5.jpg',
    background: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    current: 0,
    Arrow1: "<",
    Arrow2: ">",
    namePosition: '',
    dropdownVisible: false,
    options: [
      { label: '发布', value: '/pages/addpost/addpost' },
    ],
    items: [],
    page: 1 // 初始化页数为1
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
          } else {
            console.error('返回的数据格式不正确:', res.data.data);
          }
        } else {
          console.error('获取数据失败:', res.data.msg);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      }
    });
  },

  // 下拉刷新事件处理函数
  onPullDownRefresh: function() {
    // 清空当前数据，重新获取
    this.setData({
      items: [],
      page: 1
    }, () => {
      this.fetchUserData(); // 调用获取数据的函数
    });
    wx.stopPullDownRefresh(); // 停止下拉刷新
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

  // 获取用户位置授权
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
  }
});
