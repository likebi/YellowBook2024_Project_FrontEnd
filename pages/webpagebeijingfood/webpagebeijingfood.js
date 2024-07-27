Page({
  data: {
    beijingfoodUrl: 'https://you.ctrip.com/food/1/4976152.html',
    
  },
  openLink: function() {
    let that = this;
    wx.showActionSheet({
      itemList: ['Open in External Browser', 'Open in App'],
      success: function(res) {
        if (res.tapIndex === 0) {
          // Open in external browser
          wx.setClipboardData({
            data: that.data.url,
            success: function() {
              wx.showModal({
                title: 'Open in External Browser',
                content: 'The link has been copied to your clipboard. Please open your browser and paste the link.',
                showCancel: false
              });
            }
          });
        } else if (res.tapIndex === 1) {
          // Open in app
          wx.navigateTo({
            url: '/pages/webview/webview?url=' + encodeURIComponent(that.data.url)
          });
        }
      },
      fail: function(res) {
        console.log(res.errMsg);
      }
    });
  }
});
