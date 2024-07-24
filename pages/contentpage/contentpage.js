Page({
  data: {
    imgurl: [],
    followStatus: false,
    item: {},
    comments: [],
    inputValue: '',
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    isSwipe: false,
    offset: 0, // 初始偏移量
    limit: 4, // 每次加载的评论数量
    hasMoreComments: true, // 是否有更多评论
    loading: false, // 是否正在加载评论
  },

  onLoad: function (options) {
    const postId = options.id;
    if (postId) {
      this.fetchPostData(postId);
      this.fetchComments(postId);
    }
  },

  fetchPostData(postId) {
    const token = wx.getStorageSync('userToken');
    if (!token) {
      console.error('未找到授权 token');
      return;
    }
    wx.request({
      url: `http://localhost:3000/contentpage/contentpage/${postId}`,
      method: 'GET',
      header: {
        'Authorization': token
      },
      success: (res) => {
        if (res.data.code === 200) {
          const data = res.data.data;
          const imgurlArray = [
            data.image_url,
            data.image_url2,
            data.image_url3,
            data.image_url4
          ].filter(url => url);

          this.setData({
            item: data,
            imgurl: imgurlArray
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

  fetchComments(postId) {
    if (this.data.loading) return;
    this.setData({ loading: true });

    const { offset, limit } = this.data;

    wx.request({
      url: `http://localhost:3000/comment/getcomments/${postId}?offset=${offset}&limit=${limit}`,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('userToken')
      },
      success: (res) => {
        if (res.data.code === 200) {
          const newComments = res.data.data;
          if (newComments.length > 0) {
            this.setData({
              comments: offset === 0 ? newComments : this.data.comments.concat(newComments),
              offset: this.data.offset + newComments.length,
              hasMoreComments: newComments.length === limit
            });
          } else {
            this.setData({ hasMoreComments: false });
          }
        } else {
          wx.showToast({
            title: '获取评论失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      },
      complete: () => {
        this.setData({ loading: false });
      }
    });
  },

  onReachBottom() {
    if (this.data.hasMoreComments && !this.data.loading) {
      this.fetchComments(this.data.item.id);
    }
  },
  like_post() {
    const token = wx.getStorageSync('userToken');
    if (!token) {
      console.error('未找到授权 token');
      return;
    }
    const postId = this.data.item.id;
    console.log('Liking post with ID:', postId);
    const currentLikeCount = Number(this.data.item.liked_count) || 0;
    const isLiked = !this.data.item.isLiked;
    const newLikeCount = isLiked ? currentLikeCount + 1 : currentLikeCount - 1;
    console.log('3:', newLikeCount);
    const likeImage = isLiked ? '../../static/love2.png' : '../../static/love.png';
  
    // 更新前端数据
    this.setData({
      item: {
        ...this.data.item,
        isLiked: isLiked,
        liked_count: newLikeCount, // 修正这里
        loveImage:likeImage
      }
    });
  
     // 发送点赞请求到后端
     wx.request({
      url: `http://localhost:3000/contentpage/contentpage/like/${postId}`,
      method: 'POST',
      header: {
        'Authorization': token
      },
      data: {
        isLiked: isLiked
      },
      success: (res) => {
        console.log('Response from server (like post):', res.data);
        if (res.data.code !== 200) {
          wx.showToast({
            title: '点赞失败: ' + res.data.msg,
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
  },  
  onPullDownRefresh: function() {
    const postId = this.data.item.id;
    this.setData({
      offset: 0,
      comments: []
    }, () => {
      this.fetchComments(postId);
      wx.stopPullDownRefresh();
    });
  },

  submitComment() {
    const token = wx.getStorageSync('userToken'); // 获取 token
    if (!token) {
      console.error('未找到授权 token');
      return;
    }
    
    const commentText = this.data.inputValue.trim();
    if (!commentText) {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none'
      });
      return;
    }
    
    // const userId = wx.getStorageSync('Uid'); // 从本地存储获取用户 ID
    const userId = 9; // 从本地存储获取用户 ID
  
    wx.request({
      url: `http://localhost:3000/comment/comments`, // 后端 API 地址
      method: 'POST',
      header: {
        'Authorization': token
      },
      data: {
        postId: this.data.item.id, // 当前帖子 ID
        userId: userId,
        comment: commentText,
      },
      success: (res) => {
        console.log('Response from server:', res.data); // 输出服务器响应
          // 清空输入框
          this.setData({
            inputValue: ''
          });
        if (res.data.code === 200) {
          wx.showToast({
            title: '评论成功',
            icon: 'success'
          });
          this.fetchComments(this.data.item.id); // 刷新评论
  
        } else {
          wx.showToast({
            title: '评论失败: ' + res.data.msg, // 显示失败消息
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('Request failed:', err); // 输出请求失败信息
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      }
    });
  },  
  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  toggleFollow() {
    this.setData({
      followStatus: !this.data.followStatus
    });
  },

  handleTouchStart(event) {
    this.setData({
      startX: event.touches[0].pageX,
      startY: event.touches[0].pageY,
      isSwipe: false
    });
  },

  handleTouchMove(event) {
    const endX = event.touches[0].pageX;
    const endY = event.touches[0].pageY;
    const deltaX = endX - this.data.startX;
    const deltaY = endY - this.data.startY;

    if (deltaX < -50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      this.setData({
        isSwipe: true
      });
    }
    this.setData({
      endX,
      endY
    });
  },

  handleTouchEnd() {
    if (this.data.isSwipe) {
      wx.navigateTo({
        url: '../userPage/userPage'
      });
    }
  },

  like_comment(e) {
    const token = wx.getStorageSync('userToken');
    if (!token) {
      console.error('未找到授权 token');
      return;
    }
  
    const index = e.currentTarget.dataset.index;
    const commentId = this.data.comments[index].comment_id;
    const currentLikeCount = this.data.comments[index].liked_count || 0; // 使用 liked_count
    const isLiked = !this.data.comments[index].isLiked;
  
    const newLikeCount = isLiked ? currentLikeCount + 1 : currentLikeCount - 1;
    const likeImage = isLiked ? '../../static/love2.png' : '../../static/love.png';
  
    // 更新前端数据
    const updatedComments = [...this.data.comments];
    updatedComments[index] = {
      ...updatedComments[index],
      isLiked: isLiked,
      liked_count: newLikeCount,  // 使用 liked_count
      loveImage: likeImage
    };
  
    this.setData({
      comments: updatedComments
    });
  
    // 发送点赞请求到后端
    wx.request({
      url: `http://localhost:3000/comment/like/${commentId}`,
      method: 'POST',
      header: {
        'Authorization': token
      },
      data: {
        isLiked: isLiked
      },
      success: (res) => {
        if (res.data.code !== 200) {
          wx.showToast({
            title: '点赞失败: ' + res.data.msg,
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
  },  

  navigateToUserPage() {
    if (!this.data.isSwipe) {
      wx.navigateTo({
        url: '../userPage/userPage'
      });
    }
  },

  getuserinfo(e) {
    console.log(e);
  }
});