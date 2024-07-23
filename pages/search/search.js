Page({
  data: {
    arrowl: '<',
    value: '',
    historyList: [],
    discoverList: [] // 搜索发现列表
  },

  onLoad() {
    this.getRecord();
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
        const historyList = JSON.parse(res.data) || [];
        // console.log('Retrieved history list:', historyList); // 添加日志输出
        that.setData({
          historyList: historyList
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
      this.judge(val);
      this.setData({
        value: ''
      });
      this.performSearch(val); // 调用搜索方法
    }
  },

  // 判断历史记录是否超过10条
  judge(val) {
    let historyList = this.data.historyList;
    if (historyList.length >= 10) {
      historyList.pop(); // 超过10条则移除最后一条
    }
    if (!historyList.includes(val)) {
      if (val.length > 6) {
        val = val.slice(0, 5).trim() + '...';
      }
      historyList.unshift(val);
      this.setRecord(historyList);
      this.setData({
        historyList
      });
    }
  },

  // 执行搜索并展示结果
  performSearch(query) {
    const that = this;
    const userToken = wx.getStorageSync('userToken'); // 从storage中获取token
    if (!userToken) {
      console.error('No user token found');
      return;
    }

    wx.request({
      url: 'http://localhost:3000/api/search', // 替换为你的搜索接口
      method: 'GET',
      data: { query },
      header: {
        Authorization: `${userToken}` // 将token添加到请求头中
      },
      success(res) {
        if (res.data.code === 200) {
          that.setData({
            discoverList: res.data.data || [] // 确保数据是数组
          });
        } else {
          console.error('Failed to fetch search results:', res.data.msg);
        }
      },
      fail(err) {
        console.error('Failed to fetch search results:', err);
      }
    });
  },

// 点击历史记录项
  onHistoryItemTap(event) {
    const value = event.currentTarget.dataset.value; // 获取点击的历史记录内容
    console.log('Clicked item value:', value); // 添加日志输出
  
    if (value) { // 确保 value 不为 undefined 或 null
     this.setData({
        value: value
      });
     this.performSearch(value); // 执行搜索
    } else {
      console.warn('No value found for clicked item.');
    }
  },

  // 点击搜索发现项
  onDiscoverItemTap(event) {
    const id = event.currentTarget.dataset.id; // 获取点击的发现内容的ID
    if (id) {
      wx.navigateTo({
        url: `/pages/post/post?id=${id}` // 跳转到帖子页面，并传递帖子ID
      });
    } else {
      console.warn('No ID found for clicked discover item.');
    }
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
  }
});
