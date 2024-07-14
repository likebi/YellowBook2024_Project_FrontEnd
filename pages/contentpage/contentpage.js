// pages/planning/planning.js
Page({

  /**
   * Page initial data
   */
  data: {
    imgurl:[
      {img:"https://tse3-mm.cn.bing.net/th/id/OIP-C.IyhKsUY-cD_jd7LCOvpIFwHaG2?rs=1&pid=ImgDetMain"},
      {img:"https://ts1.cn.mm.bing.net/th/id/R-C.0852e70e9ad92bd6e6c6cf3c226b186b?rik=uy3sr6stJD4WpQ&riu=http%3a%2f%2fstatic6.businessinsider.com%2fimage%2f5527bee66bb3f71f7a28a779-480%2fputin-meme.jpg&ehk=1nJoJ%2bOEzUAWTb9Fd26hkajWHXEH14W7AUY4r46W3Tk%3d&risl=&pid=ImgRaw&r=0"},
      {img:"https://tse1-mm.cn.bing.net/th/id/OIP-C.pCqraDWilICKRnJZqmuBUAHaF6?rs=1&pid=ImgDetMain"},
      {img:"https://ts1.cn.mm.bing.net/th/id/R-C.abe0f299fbb2c557325e0bfeed166aa8?rik=9HMMKTYIAK62qA&riu=http%3a%2f%2fdeadstate.org%2fwp-content%2fuploads%2f2015%2f04%2fputin-13.jpg&ehk=3l2xpfPMNScbGxtGjqofM2KlC1tbGJWhyRcZfGroxTI%3d&risl=&pid=ImgRaw&r=0"},
      {img:"https://tse4-mm.cn.bing.net/th/id/OIP-C.76JWnN2y3dT8UNtOuCrBlQHaEL?rs=1&pid=ImgDetMain"},
    ],
    followStatus :false, //original not followed test
    img_left: "<",
    user_image:"/static/Vladimir-Putin-.jpg",
    username:"Ilya Natalia",
    location:"/static/location.png",
    heart:"/static/heart-fill.png",
    // pencil_notes:"/static/输入.png",
    star:"/static/stars.png",
    comment:"/static/comments.png",
    comments: [],
    inputValue: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  toggleFollow() {
    this.setData({
      followStatus: !this.data.followStatus
    });
  },

  onInput(e){
    this.setData({
      inputValue: e.detail.value
    });
  },
  submitComment() {
    if (this.data.inputValue.trim() === '') {
      // Do nothing if the input is empty
      return;
    }
    const comment = {
      id: new Date().getTime(),
      userImage: '/static/putinn.jpeg',  // Replace with actual user image path
      userName: 'Ilya',  // Replace with actual user name
      comment: this.data.inputValue,
      liked: false,
      likes: 0, //default num
      saved: false,
      saves: 0 //default number
    };

    const newComments = this.data.comments.concat(comment);
    this.setData({
      comments: newComments,
      inputValue: '',
    });
  },
    toggleLike(e) {
      const commentId = e.currentTarget.dataset.id;
      const comments = this.data.comments.map(comment => {
        if (comment.id === commentId) {
          comment.liked = !comment.liked;
          comment.likes = comment.liked ? comment.likes + 1 : comment.likes - 1;
        }
        return comment;
      });
      this.setData({
        comments
      });
    },
    togglesave(e) {
      const commentId = e.currentTarget.dataset.id;
      const comments = this.data.comments.map(comment => {
        if (comment.id === commentId) {
          if (!comment.saved) {
            comment.saved = true;
            comment.saves += 1; // Increment saves count
          }else {
            comment.saved = false;
            comment.saves = 0; // Reset saves count
          }
        }
        return comment;
      });
      this.setData({
        comments
      });
    },
  getuserinfo(e) {
    console.log(e)
  }
});