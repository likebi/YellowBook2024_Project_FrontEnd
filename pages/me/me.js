Page({
  "permission": {
    "scope.userInfo": {
      "desc": "获取你的昵称、头像、地区及性别"
    }
  },

  data: {
    userImage: '',
    backgroundImage: "https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient",
    Uid: '',
    nickname: '',
    follow_num: 0, // 初始化为数字
    fans_num: 0,
    like_num: 0,
    currentTab: 0,
    activeTagWidth: 64,
    activeTagLeft: 0,
    tabPositions: [22, 135],
    intro_user: 'Bio',
    items: [],
},

   // 使用 wx.request 发送请求
   fetchUserData() {
    const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
    let Uid = wx.getStorageSync('Uid');
    console.log(Uid)
    if (!token) {
      console.error('未找到授权 token');
      return;
    }
      wx.request({
        url: `http://localhost:3000/notes/notes/${Uid}`, // 你的后端 API 地址
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
    removePost(e) {
      const postId = e.currentTarget.dataset.id;
      
      const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
      let Uid = wx.getStorageSync('Uid');
      console.log(Uid)
      if (!token) {
        console.error('未找到授权 token');
        return;
      }
  
      wx.showModal({
          title: '提示',
          content: '确定要删除这篇笔记吗？',
          success: (res) => {
              if (res.confirm) {
                  wx.request({
                      url: `http://localhost:3000/notes/delete/${postId}`, // 确保 URL 格式正确
                      method: 'DELETE',
                      header: {
                          'Authorization': token 
                      },
                      success: (res) => {
                          if (res.data.code === 200) {
                              wx.showToast({
                                  title: '删除成功',
                                  icon: 'success'
                              });
                              // 更新页面数据
                              this.fetchUserData();
                          } else {
                              wx.showToast({
                                  title: '删除失败',
                                  icon: 'none'
                              });
                          }
                      },
                      fail: (err) => {
                          console.error('请求失败:', err);
                          wx.showToast({
                              title: '请求失败',
                              icon: 'none'
                          });
                      }
                  });
              }
          }
      });
  },  

  fetchLikeNum () {
    const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
      let Uid = wx.getStorageSync('Uid');
      console.log(Uid)
      if (!token) {
        console.error('未找到授权 token');
        return;
      }

    wx.request({
      url: `http://localhost:3000/notes/countlike/${Uid}`, // 你的后端 API 地址
      method: 'GET',
      header: {
        'Authorization': token
      },
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            like_num: res.data.data.likeCount // 假设后端返回的数据结构中包含 `like_num`
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
    // 使用 wx.request 发送请求
fetchUserlikeData() {
  const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
  let Uid = wx.getStorageSync('Uid');
  console.log(Uid)
  if (!token) {
    console.error('未找到授权 token');
    return;
  }
  wx.request({
    url: `http://localhost:3000/notes/like/${Uid}`, // 你的后端 API 地址
    method: 'GET',
    header: {
      'Authorization': token
    },
    success: (res) => {
      if (res.data.code === 200) {
        // 将返回的数据设置到 page 的 items 数据中
        this.setData({
          items2: res.data.data
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


  onLoad: function () {
    this.getUserInfo();
    this.fetchUserData();
    this.fetchUserlikeData() ;
    this.fetchLikeNum();
    this.fetchFollowNum();
    this.fetchFansNum();
    this.setData({
      activeTagLeft: this.data.tabPositions[this.data.currentTab]
    });

    // 检查全局数据
    const app = getApp();
    if (app.globalData.uid) {
      this.setData({
        Uid: app.globalData.uid
      });
    } else {
      const uid = wx.getStorageSync('Uid');
      if (uid) {
        this.setData({
          Uid: uid
        });
      }
    }

    if (app.globalData.nickName) {
      this.setData({
        nickname: app.globalData.nickName
      })
    } else {
      const nickname = wx.getStorageSync('nickname');
      if (nickname) {
        this.setData({
          nickname: nickname // Ensure nickname is correctly set
        });
      }
    }

    if (app.globalData.userImage) {
      this.setData({
        userImage: app.globalData.userImage
      })
    } else {
      const userImage = wx.getStorageSync('userImage');
      if (userImage) {
        this.setData({
          userImage: userImage 
        });
      }
    }
  },

  onShow() {
    this.getUserInfo();
    this.fetchUserData();
    this.fetchUserlikeData();
    this.fetchLikeNum();
    this.fetchFollowNum();
    this.fetchFansNum();
  },

  back() {
    this.getUserInfo();
    wx.navigateBack();
  },

  onChooseBackground: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          backgroundImage: res.tempFilePaths[0]
        });
        this.saveUserInfo();
      },
      fail: (err) => {
        console.error(err);
      }
    });
  },

  // 获取用户头像
  onChooseAvatar(e) {
    console.log(e);
    const avatarUrl = e.detail.avatarUrl;
  
    this.base64(avatarUrl, "png").then(base64Data => {
      console.log(base64Data, 'base64路径'); // base64Data 是 base64 编码的字符串
      
      // 更新 data 中的 userImage 为 base64 数据
      this.setData({
        userImage: e.detail.avatarUrl
      });
  
      // 确保更新后的数据能传递到服务器
      this.saveUserInfo();
      this.sendUserInfoToServer({
        userImage: base64Data
      });
    }).catch(error => {
      console.error('Base64 转换失败:', error);
    });
  },

// 选择昵称
onChooseNickname(e) {
  console.log(e);
  this.setData({
    nickname: e.detail.value
  });
  this.saveUserInfo();
  this.sendUserInfoToServer({
    nickname: e.detail.value
  });
},


// 发送用户信息到服务器
sendUserInfoToServer(data) {
  // 将data和Uid组合成一个对象
  const userData = {
    ...data,
    Uid: this.data.Uid // 传递用户UID
  };

  console.log('Sending user data to server:', userData); 

  wx.request({
    url: 'http://localhost:3000/saveUserInfo', // 替换为你的后端API地址
    method: 'POST',
    data: userData,
    header: {
      'Authorization': wx.getStorageSync('userToken') // 需要传递的token
    },
    success(res) {
      console.log('User info saved successfully:', res);
    },
    fail(err) {
      console.error('Failed to save user info:', err);
    }
  });
},

  saveUserInfo() {
    wx.setStorageSync('userInfo', {
      userImage: this.data.userImage,
      backgroundImage: this.data.backgroundImage,
      nickname: String(this.data.nickname),
      Uid: String(this.data.Uid), // 确保这里的变量名一致
    });
  },

  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      userImage: userInfo.userImage || this.data.userImage,
      nickname: String(userInfo.nickname || this.data.nickname),
      Uid: String(userInfo.Uid || this.data.Uid), // 修复这里的变量名
      backgroundImage: userInfo.backgroundImage || this.data.backgroundImage,
      intro_user: userInfo.Bio || this.data.intro_user
    });
  },

  navigateToContentPage: function(event) {
    const id = event.currentTarget.dataset.id; // 获取点击的发现内容的ID
  
    if (id) {
      console.log('点击');
      wx.navigateTo({
        url: `/pages/contentpage/contentpage?id=${id}` // 跳转到帖子页面，并传递帖子ID
      });
    } else {
      console.warn('No ID found for clicked discover item.');
    }
  },
  

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index,
      activeTagLeft: this.data.tabPositions[index]
    });
  
    // 切换到点赞标签页时刷新点赞数据
    if (index === 1) {
      this.fetchUserlikeData();
    }
  },  

  swiperChange(e) {
    const current = e.detail.current;
    this.setData({
      currentTab: current,
      activeTagLeft: this.data.tabPositions[current]
    });
  
    // 滑动到点赞页面时刷新点赞数据
    if (current === 1) {
      this.fetchUserlikeData();
    }
  },  

  edit_Profile() {
    wx.navigateTo({
      url: '/pages/profile/clickProfile',
    });
  },


  // 图片转64代码
  base64(url, type) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => {
        // resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
        resolve(res.data)
      },
      fail: res => reject(res.errMsg)
    })
  })
},

fetchFollowNum() {
  const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
  let userId = this.data.Uid;

  if (!token) {
      console.error('未找到授权 token');
      return;
  }

  wx.request({
      url: `http://localhost:3000/follow/getFollowNum/${userId}`, // 你的后端 API 地址
      method: 'GET',
      header: {
          'Authorization': token
      },
      success: (res) => {
          if (res.data.code === 200) {
              const followNum = res.data.data.follow_num !== undefined ? res.data.data.follow_num : 0;
              // 将返回的数据设置到 page 的 follow_num 数据中
              this.setData({
                  follow_num: followNum
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

fetchFansNum() {
  const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
  let userId = this.data.Uid;

  if (!token) {
      console.error('未找到授权 token');
      return;
  }

  wx.request({
      url: `http://localhost:3000/follow/getFansNum/${userId}`, // 你的后端 API 地址
      method: 'GET',
      header: {
          'Authorization': token
      },
      success: (res) => {
          if (res.data.code === 200) {
              const fansNum = res.data.data.fans_num !== undefined ? res.data.data.fans_num : 0;
              // 将返回的数据设置到 page 的 fans_num 数据中
              this.setData({
                  fans_num: fansNum
              });
          } else {
              console.error('获取数据失败:', res.data.msg);
          }
      },
      fail: (err) => {
          console.error('请求失败:', err);
      }
  });
}
})