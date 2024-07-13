Page({
  data: {
    buttonState:'button-default',
    arrowl: '<',
    value: '',
    historyList: [],
    followedList: [
      // 示例数据，可以根据需要替换
      { id: 1, name: 'User 1', followerNumber: '100', background: '/static/me.png' },
      { id: 2, name: 'User 2', followerNumber: '200', background: '/static/me.png' },
      { id: 3, name: 'User 3', followerNumber: '100', background: '/static/me.png' },
      { id: 4, name: 'User 4', followerNumber: '100', background: '/static/me.png' },
      { id: 5, name: 'User 5', followerNumber: '100', background: '/static/me.png' },
      { id: 6, name: 'User 6', followerNumber: '100', background: '/static/me.png' },
      { id: 6, name: 'User 6', followerNumber: '100', background: '/static/me.png' },
      { id: 6, name: 'User 6', followerNumber: '100', background: '/static/me.png' },
      { id: 6, name: 'User 6', followerNumber: '100', background: '/static/me.png' },
      { id: 6, name: 'User 6', followerNumber: '100', background: '/static/me.png' },
      { id: 6, name: 'User 6', followerNumber: '100', background: '/static/me.png' }

    ],
    searchResults: [] // 添加一个用于存储搜索结果的数组
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
      this.judge(val);
      this.setData({
        value: ''
      });
      this.performSearch(val); // 调用搜索函数
    }
  },
  // 判断历史记录是否超过10条
  judge(val) {
    let historyList = this.data.historyList;
    if (historyList.length < 10) {
      if (!historyList.includes(val)) {
        if (val.length > 4) {
          val = val.slice(0, 3).trim() + '...';
        }
        historyList.unshift(val);
        this.setRecord(historyList);
        this.setData({
          historyList
        });
      }
    } else {
      if (!historyList.includes(val)) {
        if (val.length > 4) {
          val = val.slice(0, 3).trim() + '...';
        }
        let i = historyList.indexOf(val);
        if (i !== -1) {
          historyList.splice(i, 1);
        }
        historyList.unshift(val);
        this.setRecord(historyList);
        this.setData({
          historyList
        });
      }
    }
  },
  // 模拟搜索函数，更新搜索结果
  performSearch(query) {
    // 模拟搜索结果，可以根据实际需求替换为实际的搜索逻辑
    const searchResults = [
      `Result for ${query} 1`,
      `Result for ${query} 2`,
      `Result for ${query} 3`,
      `Result for ${query} 4`
    ];
    this.setData({
      searchResults
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
      buttonState:this.data.buttonState === 'button-default'? 'button-clicked':'button-default'
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
  }
});
