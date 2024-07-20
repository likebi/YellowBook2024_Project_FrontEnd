// pages/planning/planning.js
Page({
  data: {
    items:[
      {
        id: 1,
        destination:'北京',
        backgroundImage:'https://bpic.588ku.com/back_list_pic/21/09/02/518698a4f8476f7d4f5557753b02a5b6.jpg' ,

      },
      // {
      //   id: 2,
      //   destination:'上海',
      //   backgroundImage:'https://tse4-mm.cn.bing.net/th/id/OIP-C.4GWdpl_jObPIBKbw2jnlugHaE7?rs=1&pid=ImgDetMain' ,

      // },
    ],
    items1:[
      {
        id: 1,
        destination:'北京',
        backgroundImage:'https://bpic.588ku.com/back_list_pic/21/09/02/518698a4f8476f7d4f5557753b02a5b6.jpg' ,

      },
      // {
      //   id: 2,
      //   destination:'上海',
      //   backgroundImage:'https://tse4-mm.cn.bing.net/th/id/OIP-C.4GWdpl_jObPIBKbw2jnlugHaE7?rs=1&pid=ImgDetMain' ,

      // },
    ]
  },

  onHandlerPageTo(){
    wx.navigateTo({ 
      url: '/pages/AI-chat/AI-chat',
    })
  },
  onHandlerPageTo1(){
    wx.navigateTo({ 
      url: '/pages/AI-chat1/AI-chat1',
    })
  },
    onHandlerPageTo2(){
    wx.navigateTo({ 
      url: '/pages/AI-chat/AI-chat',
    })
  },
    onHandlerPageTo(){
    wx.navigateTo({ 
      url: '/pages/AI-chat/AI-chat',
    })
  }
})