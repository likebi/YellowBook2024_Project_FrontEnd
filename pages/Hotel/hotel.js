// pages/Trip/trip.js
Page({

  /**
   * Page initial data
   */
  data: {
    // text: "人人有爱，很想您",
    // text2: "坚持一天拉拉啦",
    // text3: "爬山Bro，Go Let's Go",
    // text4: "冬天长城，打卡啦！",
    // loveImage: "../../static/love.png",
    isLiked: false,
    items: [
      
      {
        id: 1,
        userImage:'https://ts1.cn.mm.bing.net/th/id/R-C.a86878663b4dbfad3a4722e53a755f79?rik=5m8UAKHAbQaOHw&riu=http%3a%2f%2fn.sinaimg.cn%2ftranslate%2f201%2fw600h401%2f20190306%2fh8cG-htwhfzs6942512.jpg&ehk=dQONT%2fYVOK9nlu6NYSlV5FsF5%2fNLxvEcFNua%2b8%2fv2M4%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
        userimageComment:'https://tse4-mm.cn.bing.net/th/id/OIP-C.wsZ0tnm9gXJot1pfshIeEwHaE8?rs=1&pid=ImgDetMain',
        text: "迷人的灰太狼",
        intro:'上海迪斯尼乐园',
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
        userImage:'https://ts1.cn.mm.bing.net/th/id/R-C.e26e0cd03aac4004f982c1d22fba5ed9?rik=Iu4vYHaoZZ9fgw&riu=http%3a%2f%2fwww.lvjie.com.cn%2fuploadfile%2f2021%2f1009%2f20211009113740528.jpg&ehk=ePgYh61ZshcX%2fE37EXmyeGPTvud%2bIyuznQYUrS9gA2o%3d&risl=&pid=ImgRaw&r=0',
        userimageComment:'https://tse1-mm.cn.bing.net/th/id/OIP-C.6J6P38DlFPlnEWGElv4KAwHaLH?rs=1&pid=ImgDetMain',
        text: "人人有爱，很想您",
        intro:'九寨沟国家5A景区',
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 3,
        userImage:'https://tse2-mm.cn.bing.net/th/id/OIP-C.dlMqkLfmoMNnsa2-c_cLOwHaFj?rs=1&pid=ImgDetMain',
        userimageComment:'https://tse4-mm.cn.bing.net/th/id/OIP-C.p4HvqiQM3ZEi_oP3HPGrsAHaEK?rs=1&pid=ImgDetMain',
        text: "狐狸小可爱",
        intro:'爬山Bro，Go Lets Go',
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 4,
        userImage:'https://ts1.cn.mm.bing.net/th/id/R-C.633b26d9ac027c010db8160c6263dd82?rik=bbuxSAtCotmS7g&riu=http%3a%2f%2fwww.hdwallpaperslife.com%2fwp-content%2fuploads%2f2018%2f05%2fmoscow_kremlin_red_square_russia_capital_59491_1400x1050.jpg&ehk=Q0imhTW2eYsSV6aI66g1qf1RJ4UBWTA2dw5UWw8uYD0%3d&risl=&pid=ImgRaw&r=0',
        userimageComment:'https://tse4-mm.cn.bing.net/th/id/OIP-C.l23jkN3YdaDXjoWlsXuDjAHaJ4?rs=1&pid=ImgDetMain',
        text: "Hello Gods",
        intro:'克里姆林宫',
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 5,
        userImage:'https://tse2-mm.cn.bing.net/th/id/OIP-C.uFEcW-KOPCczGYlvm1aRngHaE8?rs=1&pid=ImgDetMain',
        userimageComment:'https://tse1-mm.cn.bing.net/th?id=OIF-C.2jZV%2fN3MWMMN9wIXqBNRnw&rs=1&pid=ImgDetMain',
        text: "Champion欧洲杯小伙伴",
        intro:'Colloseum，德国',
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 6,
        userImage:'https://tse2-mm.cn.bing.net/th/id/OIP-C.fbkQg7tmh4H4Of-Wy9rjlQHaE8?rs=1&pid=ImgDetMain',
        userimageComment:'https://tse4-mm.cn.bing.net/th/id/OIP-C.E3JNQ8KiGJjI73IgLdFrywHaE8?rs=1&pid=ImgDetMain',
        text: "Selamat Datang Raja Ampat",
        intro:'克里姆林宫',
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
