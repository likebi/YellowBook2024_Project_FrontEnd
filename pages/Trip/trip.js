// pages/Trip/trip.js
Page({

  /**
   * Page initial data
   */
  data: {
    text: "人人有爱，很想您",
    text2: "坚持一天拉拉啦",
    text3: "爬山Bro，Go Let's Go",
    text4: "冬天长城，打卡啦！",
    loveImage: "../../static/love.png",
    isLiked: false,
    items: [
      
      {
        id: 1,
        // text: "迷人的灰太狼",
        // loveImage: "../../static/love.png",
        // isLiked: false,
      },
      // {
      //   id: 2,
      //   text: "另一项内容",
      //   loveImage: "../../static/love.png",
      //   isLiked: false,
      // }
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
