Page({
  data: {
    postUrl: 'https://hotels.ctrip.com/hotels/list?countryId=1&city=1&provinceId=0&checkin=2024/07/23&checkout=2024/07/24&optionId=1&optionType=City&directSearch=0&display=%E5%8C%97%E4%BA%AC%2C%20%E4%B8%AD%E5%9B%BD&crn=1&adult=1&children=0&searchBoxArg=t&travelPurpose=0&ctm_ref=ix_sb_dl&domestic=1&',
    qrCodeUrl: '' // URL for the generated QR code
  },
  onLoad: function() {
    const webUrl = 'https://hotels.ctrip.com/hotels/list?countryId=1&city=1&provinceId=0&checkin=2024/07/23&checkout=2024/07/24&optionId=1&optionType=City&directSearch=0&display=%E5%8C%97%E4%BA%AC%2C%20%E4%B8%AD%E5%9B%BD&crn=1&adult=1&children=0&searchBoxArg=t&travelPurpose=0&ctm_ref=ix_sb_dl&domestic=1&'; // Replace with your actual post URL
    this.generateQRCode(webUrl);
  },
  generateQRCode: function(url) {
    // Generate the QR code (you might need an external library or service for this)
    // Set the qrCodeUrl with the generated QR code image URL
    // For example purposes, let's assume you have a function that generates the URL
    const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
    this.setData({
      qrCodeUrl: qrCodeImageUrl
    });
  },
  openExternalWebpage: function() {
    const webUrl = this.data.postUrl;
    wx.showModal({
      title: 'Open in Browser',
      content: `Click OK to open ${webUrl} in your browser.`,
      success (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: webUrl,
            success: function () {
              wx.showModal({
                title: 'URL Copied',
                content: 'The URL has been copied to your clipboard. Please paste it in your browser to open.',
                showCancel: false,
                success: function () {
                  // Optional: Show instructions or additional information
                }
              });
            }
          });
        }
      }
    });
  }
});
  // openExternalWebpage: function() {
  //   const webUrl = this.data.postUrl;
  //   wx.setClipboardData({
  //     data: webUrl,
  //     success: function () {
  //       wx.showModal({
  //         title: 'Open in Browser',
  //         content: 'The URL has been copied to your clipboard. Please paste it in your browser to open.',
  //         showCancel: false
  //       });
  //     }
  //   });
  // }

