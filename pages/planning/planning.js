// pages/planning/planning.js
Page({
  data: {
    items:[
      {
        id: 1,
        destination:'旅游计划1',
        backgroundImage:'https://bpic.588ku.com/back_list_pic/21/09/02/518698a4f8476f7d4f5557753b02a5b6.jpg' ,

      },
    ],
    items1:[
      {
        id: 1,
        destination:'旅游计划2',
        backgroundImage:'https://tse4-mm.cn.bing.net/th/id/OIP-C.4GWdpl_jObPIBKbw2jnlugHaE7?rs=1&pid=ImgDetMain' ,

      },
    ],
    items2:[
      {
        id: 1,
        destination:'旅游计划3',
        backgroundImage:'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/ngdjrkofhjcl0q4m81en/BorobudurSunriseTour.jpg' ,

      },
    ],
    items3:[
      {
        id: 1,
        destination:'旅游计划4',
        backgroundImage:'https://ts1.cn.mm.bing.net/th/id/R-C.b32a0339430c7cc3e4565feec229c7ba?rik=hJwUCM9m8xrQ8A&riu=http%3a%2f%2fstatic.asiawebdirect.com%2fm%2fkl%2fportals%2fvisit-malaysia-com%2fhomepage%2ftop10-attractions%2fpagePropertiesImage%2fmalaysia-attractions-top-10.jpg&ehk=w%2f6L%2blzfYwD75HTDvD6go9wd7Qcno6935JV%2bir2FHUA%3d&risl=&pid=ImgRaw&r=0' ,

      },
    ],
    items4:[
      {
        id: 1,
        destination:'旅游计划5',
        backgroundImage:'https://pic.kuaizhan.com/g3/87/06/f991-11ec-4bb7-ba28-66c68992b4ca12' ,

      },
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
      url: '/pages/AI-chat2/AI-chat2',
    })
  },
  onHandlerPageTo3(){
    wx.navigateTo({ 
      url: '/pages/AI-chat3/AI-chat3',
    })
  },
  onHandlerPageTo4(){
    wx.navigateTo({ 
      url: '/pages/AI-chat4/AI-chat4',
    })
  },
})