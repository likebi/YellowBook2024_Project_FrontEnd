// pages/Trip/trip.js
Page({

  /**
   * Page initial data
   */
  data: {
    isLiked: false,
    items: [
      
      {
        id: 1,
        tripImage:'https://tse3-mm.cn.bing.net/th/id/OIP-C.9p2Ha8ecYTki3TGpmfOTtQHaET?rs=1&pid=ImgDetMain',
        tripTitle:'上海迪斯尼乐园',
        userimageFoodrec:'https://tse3-mm.cn.bing.net/th/id/OIP-C.hi4qsCrTeld62WOum9HFswHaLI?rs=1&pid=ImgDetMain',
        userimageFoodtext:'hehehe',
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
        tripImage:'https://tse2-mm.cn.bing.net/th/id/OIP-C.4sO5pSUXQJPqcJUR4x_fkAHaE7?rs=1&pid=ImgDetMain',
        tripTitle:'上海迪斯尼乐园',
        userimageFoodrec:'https://tse3-mm.cn.bing.net/th/id/OIP-C.hi4qsCrTeld62WOum9HFswHaLI?rs=1&pid=ImgDetMain',
        userimageFoodtext:'hahaha',
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 3,
        tripImage:'https://tse2-mm.cn.bing.net/th/id/OIP-C.ut6ogC6odbyuXG_05v8yPQHaE8?rs=1&pid=ImgDetMain',
        tripTitle:'上海迪斯尼乐园',
        userimageFoodrec:'https://tse3-mm.cn.bing.net/th/id/OIP-C.hi4qsCrTeld62WOum9HFswHaLI?rs=1&pid=ImgDetMain',
        userimageFoodtext:'hihihi',
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 4,
        tripImage:'https://tse3-mm.cn.bing.net/th/id/OIP-C.0x2fCRq5BHhD4YEIlNhE1QHaJ4?rs=1&pid=ImgDetMain',
        tripTitle:'上海迪斯尼乐园',
        userimageFoodrec:'https://tse3-mm.cn.bing.net/th/id/OIP-C.hi4qsCrTeld62WOum9HFswHaLI?rs=1&pid=ImgDetMain',
        userimageFoodtext:'hohoho',
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      
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
