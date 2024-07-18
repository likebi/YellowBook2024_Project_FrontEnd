
Page({
  data: {
    latitude:null,
    longtitude:null,
    city:'',

    demoText1: 'https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient',
    demoText2: 'https://th.bing.com/th/id/R.496ccc48796a3ce6fbcdd0173436c3da?rik=aLk8AbZezYqp6g&riu=http%3a%2f%2fwww.gjlysy.com%2fupload%2fimage%2f20190918%2f15687778356989439.jpg&ehk=i3eyZiPsIs3qi7QZB0KQTq1bdwKt%2f9F%2fewvOm%2fnYakE%3d&risl=&pid=ImgRaw&r=0',
    demoText3: 'https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient',
    background: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    userImage: '/static/me.png',
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
  
    items: [
      {
        id: 1,
        itemImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1xIwmlF2qTdBieTBW7pkFAHaE8?rs=1&pid=ImgDetMain',
        intro:'SOTO BETAWI 印度尼西亚黄椰汤',
        text: "Agus",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
        itemImage: 'https://video.cgtn.com/news/2022-09-29/Shanghai-s-Huangpu-River-boosts-economy-in-Yangtze-River-Delta-1dIM1NhfZKM/video/5f46a45b50c2455bbd175b1056c5122f/5f46a45b50c2455bbd175b1056c5122f.jpeg',
        intro:'我的城市',
        text: "真的的上海人",
        loveImage: "../../static/love.png",
        isLiked: false,
      },

      {
        id: 3,
        itemImage: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.iACihbLRXkucP2AK7dhGfgHaEK?rs=1&pid=ImgDetMain',
        intro:'北海道冬天温泉市',
        text: "北海道666",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 4,
        itemImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.jXEJdOp1OOMAMi3qB8FpPAHaE8?rs=1&pid=ImgDetMain',
        intro:'马来西亚椰浆饭',
        text: "马来西亚better then SG",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 5,
        itemImage: 'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
        intro:'联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz',
        text: "迷人的灰太狼",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 6,
        itemImage: 'https://cdn.donmai.us/sample/7d/b4/__elysia_and_elysia_honkai_and_1_more_drawn_by_macaroni_0101__sample-7db413e1f173d044760ea7e281633813.jpg',
        intro:'我推的孩子',
        text: "另一项内容",

        loveImage: "../../static/love.png",
        isLiked: false,
      },

      {
        id: 3,
        itemImage: 'https://cdn.donmai.us/sample/7d/b4/__elysia_and_elysia_honkai_and_1_more_drawn_by_macaroni_0101__sample-7db413e1f173d044760ea7e281633813.jpg',
        intro:'我推的孩子',
        text: "另一项内容",

        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 4,
        itemImage: 'https://media.9game.cn/gamebase/2021/7/12/227692967.jpg',
        intro:'我推的孩子',
        text: "另一项内容",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
    ],
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
  
  onLoad: function () {
    this.setData({
      background: [this.data.demoText1, this.data.demoText2, this.data.demoText3]
    });
    this.getUserInfo();
    this.getUserLocation();
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

