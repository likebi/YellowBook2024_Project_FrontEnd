// pages/Trip/trip.js
Page({

  /**
   * Page initial data
   */
  data: {
    // text: "人人有爱，很想您",
    // text2: "坚持一天拉拉啦",
    // text3: "爬山Bro，Go Let's Go",
    // text4: "冬天长城，打卡啦！",
    // loveImage: "../../static/love.png",
    page: 1, // 初始化页数为1
    isLiked: false,
    items: [],
  },


  onLoad: function () {
    const app = getApp();
    app.checkUserToken(() => {
      this.getPost();
    });
  },

  onReachBottom() {
    console.log('触发了 onReachBottom');
    this.fetchUserData();  // 调用 fetchUserData 方法
  },

  getPost: function() {
    const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
    const tags = '酒店';
    const encodedTags = encodeURIComponent(tags);
    wx.request({
      url: `http://localhost:3000/itemfilter?tags=${encodedTags}`, // 你的后端 API 地址
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

  onPullDownRefresh() {
    console.log('触发了 onPullDownRefresh');
    this.setData({ page: 1, items: [] }, () => {
      this.fetchUserData();
    });
  },

  navigateToContentPage: function (event) {
    const id = event.currentTarget.dataset.id;
    console.log(`${id}`)
    wx.navigateTo({
      url: `/pages/contentpage/contentpage?id=${id}`,
    });
  },
});
