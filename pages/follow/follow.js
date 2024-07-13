Page({
  data: {
    arrowl:'<',
    value: '',
    historyList: []
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
    // 示例：返回到上一个页面
    wx.navigateBack();
  },
  // 处理关注按钮点击事件
  onFollowed() {
    console.log('Followed button clicked');
  },
  // 处理粉丝按钮点击事件
  onFans() {
    console.log('Fans button clicked');
  }
});
