Page({
  data: {


    value: '',
    followedList: [
      // 示例数据，可以根据需要替换
      { id: 1, 
        name: 'User 1', 
        followerNumber: '100', 
        background: '/static/me.png' },
    ],
  },

  
  // 存储本地数据
  setRecord(val) {
    wx.setStorage({
      key: 'history',
      data: JSON.stringify(val)
    });
  },

  // 处理返回事件
  onBack() {
    wx.navigateBack();
  },
  // 处理排序按钮点击事件
  onOrderChange() {
    console.log('Order button clicked');
    // 在这里添加排序逻辑
  }
});