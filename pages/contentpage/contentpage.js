Page({
  data: {
    imgurl: [],
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
        // 确保在正确时间点调用 checkFollowStatus
        this.setData({
            isFollowing: false // 初始化为未关注状态
        }, () => {
            this.checkFollowStatus(); // 确保在设置数据后调用
        });
    }
},

  // 使用 wx.request 发送请求
  fetchPostData(postId) {
    const token = wx.getStorageSync('userToken');

    if (!token) {
      console.error('未找到授权 token');
      return;
    }

    wx.request({
      url: `http://localhost:3000/contentpage/${postId}`,
      method: 'GET',
      header: {
        'Authorization': token
      },
      success: (res) => {
        if (res.data.code === 200) {
          const item = res.data.data;
          const imgurlArray = [
            item.image_url,
            item.image_url2,
            item.image_url3,
            item.image_url4
          ].filter(url => url);
          this.setData({
            item: {
              id: item.id,
              ContentUid: item.ContentUid, // 确保这里正确设置
              userImage: item.userImage,
              userName: item.userName,
              title_post: item.title_post,
              text_post: item.text_post,
              content_date: item.content_date,
              position_content: item.position_content,
              loveImage: item.loveImage,
              isLiked: item.isLiked
            },
            imgurl: imgurlArray
          });
          console.log('Item data:', this.data.item);
          console.log('获取数据成功:', res.data.msg);
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
    const likeImage = isLiked ? '../../static/love2.png' : '../../static/love.png';

    // 更新前端数据
    this.setData({
      item: {
        ...this.data.item,
        isLiked: isLiked,
        liked_count: newLikeCount, // 修正这里
        loveImage: likeImage
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

  onPullDownRefresh: function () {
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
    // 切换关注状态
    const newFollowStatus = !this.data.isFollowing;

    // 获取当前用户的 UID
    const currentUid = wx.getStorageSync('Uid'); // 假设 UID 存储在 'userUid' 键中
    if (!currentUid) {
      console.error('未找到当前用户 UID');
      return;
    }

    // 获取内容用户的 ContentUid
    const contentUid = this.data.item.ContentUid;
    if (!contentUid) {
      console.error('未找到内容用户 UID');
      return;
    }

    // 准备请求数据
    const requestData = {
      uid: currentUid,
      contentUid: contentUid,
      is_following: newFollowStatus ? 1 : 0
    };

    // 发送请求到后端
    wx.request({
      url: 'http://localhost:3000/follow/toggle', // 替换为你的后端 API 地址
      method: 'POST',
      header: {
        'Authorization': wx.getStorageSync('userToken')
      },
      data: requestData,
      success: (res) => {
        if (res.data.code === 200) {
          // 更新前端数据
          this.setData({
            isFollowing: newFollowStatus
          });
          wx.showToast({
            title: newFollowStatus ? '关注成功' : '取消关注成功',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '操作失败: ' + res.data.msg,
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
        isSwipe: true // 设置标志位为滑动
      });
    } else {
      this.setData({
        endX,
        endY
      });
    }
  },

  handleTouchEnd(event) {
    const ContentUid = this.data.item.ContentUid;
    console.log('HandleTouchEnd - UserID:', ContentUid);
    console.log('HandleTouchEnd - IsSwipe:', this.data.isSwipe); // 添加调试信息
    const targetUrl = `/pages/userPage/userPage?ContentUid=${ContentUid}`;
    console.log('Navigating to:', targetUrl);
    if (ContentUid && this.data.isSwipe) {
      wx.navigateTo({
        url: targetUrl
      });
    } else {
      console.error('ContentUid is missing or swipe not detected');
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
    const ContentUid = this.data.item.ContentUid;

    if (!this.data.isSwipe) {
      wx.navigateTo({
        url: `/pages/userPage/userPage?ContentUid=${ContentUid}`
      });
    }
  },

  getuserinfo(e) {
    console.log(e);
  },

  checkFollowStatus: function () {
    const token = wx.getStorageSync('userToken');
    if (!token) {
        console.error('未找到授权 token');
        return;
    }
    const uid = wx.getStorageSync('Uid'); // 当前用户 uid
    const contentUid = this.data.item.ContentUid; // 内容用户 ContentUid

    if (!contentUid) {
        console.error('内容用户 UID 为空');
        return;
    }

    wx.request({
        url: 'http://localhost:3000/follow/status',
        method: 'GET',
        header: {
            'Authorization': token
        },
        data: {
            uid: uid,
            contentUid: contentUid
        },
        success: (res) => {
            if (res.data.code === 200) {
                this.setData({
                    isFollowing: res.data.is_following === 1
                });
            } else {
                console.error('获取关注状态失败:', res.data.msg);
            }
        },
        fail: (err) => {
            console.error('请求失败:', err);
        }
    })
  }
});