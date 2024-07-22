Page({
  data: {
    imgurl: [
      
    ],
    followStatus: false,
    item:[{
      // id:1,
      // userImage:"../../static/test.png",
      // userName:'ali',
      // title_post:'陪伴我十年青春的男孩 一眨眼都长大啦',
      // text_post:'很多人都说中学的恋情是最长情 最深刻的 我们2015年相识 真的一眨眼十年过去了',
      // content_date:'0709',
      // position_content:'江南',
    }],



    comments: [{
      // id: 1,
      userImage: 'https://cdn.donmai.us/sample/7d/b4/__elysia_and_elysia_honkai_and_1_more_drawn_by_macaroni_0101__sample-7db413e1f173d044760ea7e281633813.jpg',
      userName: '小米',
      // comment: '小米是个好人',
      // loveImage: '../../static/love.png', // 默认显示未点赞的图标
      // isLiked: false, // 标记是否已点赞
      // num_comment:0,
    }],
    inputValue: '',
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    isSwipe: false
  },

  onLoad: function (options) {
    const postId = options.id; // Get the ID from the query parameters
    if (postId) {
      this.fetchPostData(postId); // Fetch the data based on the ID
    }
  },

   // 使用 wx.request 发送请求
   fetchPostData(postId) {
    const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token

    if (!token) {
        console.error('未找到授权 token');
        return;
    }
    wx.request({
        url: `http://localhost:3000/contentpage/${postId}`, // 你的后端 API 地址
        method: 'GET',
        header: {
            'Authorization': token
        },
        success: (res) => {
            if (res.data.code === 200) {
                this.setData({
                    item: res.data.data,
                    imgurl: { img: res.data.data.image_url } // 将 image_url 作为对象传递
                });
                console.log('Item data:', this.image_url);
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



  toggleFollow() {
    this.setData({
      followStatus: !this.data.followStatus
    });
  },


  handleTouchStart(event) {
    this.setData({
      startX: event.touches[0].pageX,
      startY: event.touches[0].pageY,
      isSwipe: false // 初始化标志位
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
    }
    this.setData({
      endX,
      endY
    });
  },

  handleTouchEnd() {
    if (this.data.isSwipe) {
      // 跳转到用户主页
      wx.navigateTo({
        url: '../userPage/userPage'
      });
    }
  },

  like_post: function (e) {
    const index = e.currentTarget.dataset.index;
    const comments = this.data.comments;
    comments[index].isLiked = !comments[index].isLiked;
    comments[index].loveImage = comments[index].isLiked ? '../../static/love2.png' : '../../static/love.png';
    this.setData({ comments });
  },

  togglesave(e) {
    const commentId = e.currentTarget.dataset.id;
    const comments = this.data.comments.map(comment => {
      if (comment.id === commentId) {
        comment.saved = !comment.saved;
        comment.saves = comment.saved ? comment.saves + 1 : 0;
      }
      return comment;
    });
    this.setData({
      comments
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
