Page({
  data: {
    imgurl: [
      { img: "https://sns-webpic-qc.xhscdn.com/202407142124/d6d9e57a82067916cc21223cf76a807a/1040g2sg3121pc3iu3i005pfjtmah9a7uj0v4ldo!nd_dft_wlteh_webp_3" },
      { img: "https://sns-webpic-qc.xhscdn.com/202407142124/3a2b092c095068d545f78b71ecfeb183/1040g2sg3121pc3iu3i1g5pfjtmah9a7u3kdq150!nd_dft_wlteh_webp_3" },
      { img: "https://c-ssl.duitang.com/uploads/item/202002/08/20200208034637_hz4HJ.jpeg" },
    ],
    followStatus: false,
    comments: [{
      id: 1,
      userImage: 'https://cdn.donmai.us/sample/7d/b4/__elysia_and_elysia_honkai_and_1_more_drawn_by_macaroni_0101__sample-7db413e1f173d044760ea7e281633813.jpg',
      userName: '小米',
      comment: '小米是个好人',
      loveImage: '../../static/love.png', // 默认显示未点赞的图标
      isLiked: false, // 标记是否已点赞
      num_comment:0,

      id: 2,
      userImage: 'https://cdn.donmai.us/sample/7d/b4/__elysia_and_elysia_honkai_and_1_more_drawn_by_macaroni_0101__sample-7db413e1f173d044760ea7e281633813.jpg',
      userName: '小米',
      comment: '小米是个好人haha',
      loveImage: '../../static/love.png', // 默认显示未点赞的图标
      isLiked: false // 标记是否已点赞
    }],
    inputValue: '',
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    isSwipe: false
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
