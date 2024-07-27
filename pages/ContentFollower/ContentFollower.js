// ContentFollower.js
Page({
  data: {
    followedList: [],
    ContentUid: '' // 添加ContentUid
  },

  onLoad(options) {
    const ContentUid = options.ContentUid;
    if (ContentUid) {
      this.setData({
        ContentUid: ContentUid
      });
      this.fetchFollowList();
    }
  },

  fetchFollowList() {
    const token = wx.getStorageSync('userToken');
    const ContentUid = this.data.ContentUid;
  
    if (!token) {
      console.error('未找到授权 token');
      return;
    }
    wx.request({
      url: `http://localhost:3000/follow/getFollowList/${ContentUid}`, // 替换为你的后端 API 地址
      method: 'GET',
      header: {
        'Authorization': token
      },
      success: (res) => {
        console.log('Response data:', res.data);
        if (res.data.code === 200) {
          this.setData({
            followedList: res.data.data
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

  onBack() {
    wx.navigateBack();
  }
});
