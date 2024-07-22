Page({
  data: {
    buttonState: 'button-default',
    arrowl: '<',
    value: '',
    historyList: [],
    searchResults: [], // 添加一个用于存储搜索结果的数组
    locations: [],
    token: '' // 存储 token
  },
  onLoad() {
    this.getRecord();
    this.getTokenAndFetchLocations();
  },
  // 处理输入事件
  onInput(event) {
    this.setData({
      value: event.detail.value
    });
  },
  // 获取本地记录
  getRecord() {
    const that = this;
    wx.getStorage({
      key: 'history',
      success(res) {
        that.setData({
          historyList: JSON.parse(res.data)
        });
      }
    });
  },
  // 存储本地数据
  setRecord(val) {
    wx.setStorage({
      key: 'history',
      data: JSON.stringify(val)
    });
  },
  // 确认搜索
  onSearch() {
    const val = this.data.value;
    if (val) {
      this.setData({
        value: ''
      });
      this.performSearch(val); // 调用搜索函数
    }
  },
  
  performSearch(query) {
    // 获取 token
    const token = wx.getStorageSync('userToken');
    
    if (!token) {
      console.error('No authorization token found');
      this.setData({
        searchResults: []
      });
      return;
    }
    
    console.log('Performing search with query:', query);
    
    wx.request({
      url: `http://localhost:3000/searchlocations?query=${encodeURIComponent(query)}`, // 使用新的搜索 API 路径
      method: 'GET',
      header: {
        'Authorization': token // 确保添加了 'Bearer' 前缀或根据实际需求调整
      },
      success: (res) => {
        console.log('Search response:', res); // 打印响应
        if (res.data.code === 200) {
          this.setData({
            searchResults: res.data.data
          });
        } else {
          console.error('搜索失败:', res.data.msg);
          this.setData({
            searchResults: []
          });
        }
      },
      fail: (err) => {
        console.error('搜索请求失败:', err);
        this.setData({
          searchResults: []
        });
      }
    });
  },
      // 是否展示modal
  showModal() {
    this.setData({
      show: true
    });
  },
  // 是否关闭modal
  close() {
    this.setData({
      show: false
    });
  },
  // 删除tags
  delTags() {
    wx.clearStorage();
    this.setData({
      historyList: [],
      show: false
    });
  },
  // 处理返回事件
  onBack() {
    wx.navigateBack();
  },
  // 处理关注按钮点击事件
  onFollowed() {
    console.log('Followed button clicked');
    this.setData({
      buttonState: this.data.buttonState === 'button-default' ? 'button-clicked' : 'button-default'
    })
  },
  // 处理粉丝按钮点击事件
  onFans() {
    console.log('Fans button clicked');
  },
  // 处理排序按钮点击事件
  onOrderChange() {
    console.log('Order button clicked');
    // 在这里添加排序逻辑
  },

  // 获取 token 并获取地点数据
  getTokenAndFetchLocations() {
    const token = wx.getStorageSync('userToken'); // 获取 token
    if (token) {
      this.setData({ token }); // 设置 token 到 data 中
      this.fetchLocations(token);
    } else {
      console.error('No authorization token found');
    }
  },

  fetchLocations(token) {
    wx.request({
      url: 'http://localhost:3000/locations',
      method: 'GET',
      header: {
        'Authorization': token
      },
      success: (res) => {
        if (res.data.code === 200) {
          console.log('成功', res.data.data);
          this.setData({
            locations: res.data.data // 确保这部分数据与前端展示匹配
          });
        } else {
          console.error('Failed to fetch locations:', res.data.msg);
        }
      },
      fail: (err) => {
        console.error('Failed to fetch locations:', err);
      }
    });
  },

    // 点击地点事件处理函数
    onLocationClick(event) {
      const locationId = event.currentTarget.dataset.id; // 获取点击的地点 ID
      console.log('Clicked location ID:', locationId);
  
      // 在这里你可以做任何你想做的操作，比如跳转到详情页面
      wx.navigateTo({
        url: `/path/to/detail/page?locationId=${locationId}` // 修改为你的页面路径
      });
    }
});
