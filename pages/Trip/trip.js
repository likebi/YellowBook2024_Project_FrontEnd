// pages/Trip/trip.js
Page({

  /**
   * Page initial data
   */
  data: {
    items: [
      {
        id: 1,
        text: "迷人的灰太狼",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
        text: "另一项内容",
        loveImage: "../../static/love.png",
        isLiked: false,
      }
    ],
  },

  like_post: function (e) {
    const index = e.currentTarget.dataset.index;
    const items = this.data.items;

    // 切换点赞状态
    items[index].isLiked = !items[index].isLiked;
    items[index].loveImage = items[index].isLiked ? '../../static/love2.png' : '../../static/love.png';

    // 更新数据
    this.setData({ items });
  },
});
