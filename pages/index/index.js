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
    const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
    const { page } = this.data;

    if (!token) {
        console.error('未找到授权 token');
        return;
    }

    wx.request({
        url: `http://localhost:3000/firstPages/items?page=${page}`, // 增加分页参数
        method: 'GET',
        header: {
            'Authorization': token
        },
        success: (res) => {
            if (res.data.code === 200) {
                // 检查返回的数据结构
                if (Array.isArray(res.data.data)) {
                    // 将新的数据追加到 items 中
                    this.setData({
                        items: this.data.items.concat(res.data.data || []), // 追加新数据
                        page: page + 1 // 更新页数
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

  like_post(event) {
    const token = wx.getStorageSync('userToken');
    if (!token) {
      console.error('未找到授权 token');
      return;
    }
    
    const index = event.currentTarget.dataset.index;
    const postId = this.data.items[index].id;
    const isLiked = !this.data.items[index].isLiked;
    const currentLikeCount = Number(this.data.items[index].liked_count) || 0;
    const newLikeCount = isLiked ? currentLikeCount + 1 : currentLikeCount - 1;
    console.log(newLikeCount)
    const likeImage = isLiked ? '../../static/love2.png' : '../../static/love.png';
    
    // 更新前端数据
    this.setData({
      [`items[${index}].isLiked`]: isLiked,
      [`items[${index}].liked_count`]: newLikeCount,
      [`items[${index}].loveImage`]: likeImage
    }, () => {
      // 检查更新后数据
      console.log('Updated items:', this.data.items[index]);
    });
  
    // 发送点赞请求到后端
    wx.request({
      url: `http://localhost:3000/contentpage/contentpage/like/${postId}`,
      method: 'POST',
      header: {
        'Authorization': token
      },
      data: {
        isLiked: isLiked
      },
      success: (res) => {
        console.log('Response from server (like post):', res.data);
        if (res.data.code !== 200) {
          wx.showToast({
            title: '点赞失败: ' + res.data.msg,
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
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
  },
});



