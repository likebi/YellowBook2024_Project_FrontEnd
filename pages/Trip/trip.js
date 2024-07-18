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
<<<<<<< HEAD
        itemImage: 'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
        intro:'联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz',
        text: "迷人的灰太狼",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
        itemImage: 'https://cdn.donmai.us/sample/7d/b4/__elysia_and_elysia_honkai_and_1_more_drawn_by_macaroni_0101__sample-7db413e1f173d044760ea7e281633813.jpg',
        intro:'我推的孩子',
        text: "另一项内容",

        loveImage: "../../static/love.png",
        isLiked: false,
      },

      {
        id: 3,
        itemImage: 'https://cdn.donmai.us/sample/7d/b4/__elysia_and_elysia_honkai_and_1_more_drawn_by_macaroni_0101__sample-7db413e1f173d044760ea7e281633813.jpg',
        intro:'我推的孩子',
        text: "另一项内容",

        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 4,
        itemImage: 'https://media.9game.cn/gamebase/2021/7/12/227692967.jpg',
        intro:'我推的孩子',
        text: "另一项内容",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 1,
        itemImage: 'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
        intro:'联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz',
        text: "迷人的灰太狼",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
        itemImage: 'https://cdn.donmai.us/sample/7d/b4/__elysia_and_elysia_honkai_and_1_more_drawn_by_macaroni_0101__sample-7db413e1f173d044760ea7e281633813.jpg',
        intro:'我推的孩子',
        text: "另一项内容",

        loveImage: "../../static/love.png",
        isLiked: false,
      },

      {
        id: 3,
        itemImage: 'https://cdn.donmai.us/sample/7d/b4/__elysia_and_elysia_honkai_and_1_more_drawn_by_macaroni_0101__sample-7db413e1f173d044760ea7e281633813.jpg',
        intro:'我推的孩子',
        text: "另一项内容",

        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 4,
        itemImage: 'https://media.9game.cn/gamebase/2021/7/12/227692967.jpg',
        intro:'我推的孩子',
        text: "另一项内容",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
=======
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
>>>>>>> caee3f50245101c14f12062b5bc1605c0596860c
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
