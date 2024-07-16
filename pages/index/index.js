
Page({
  data: {
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
    namePosition: "厦门",
    dropdownVisible: false,
    itemImage:'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
    options: [
      { label: '发布', value: '/pages/addpost/addpost' },
      { label: '选项2', value: 'page2' },
      { label: '选项3', value: 'page3' }
    ],
  
    items: [
      {
        id: 1,
        itemImage: 'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
        intro:'联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz',
        text: "迷人的灰太狼",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
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
      {
        id: 1,
        itemImage: 'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
        intro:'联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz',
        text: "迷人的灰太狼",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
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
      {
        id: 1,
        itemImage: 'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
        intro:'联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz',
        text: "迷人的灰太狼",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
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

