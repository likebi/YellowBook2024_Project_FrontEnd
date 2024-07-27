Page({
  data: {
    jakartaUrl: 'https://hotels.ctrip.com/hotels/detail/?hotelId=1522312&checkIn=2024-07-26&checkOut=2024-07-27&cityId=524&minprice=&mincurr=&adult=1&children=0&ages=&crn=1&curr=&fgt=&stand=&stdcode=&hpaopts=&mproom=&ouid=&shoppingid=&roomkey=&highprice=-1&lowprice=0&showtotalamt=&hotelUniqueKey=&intl=1',
    
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
