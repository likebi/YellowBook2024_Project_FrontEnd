// pages/planning/planning.js
Page({

  /**
   * Page initial data
   */
  data: {
    imgurl:[
      {img:"https://sns-webpic-qc.xhscdn.com/202407142124/d6d9e57a82067916cc21223cf76a807a/1040g2sg3121pc3iu3i005pfjtmah9a7uj0v4ldo!nd_dft_wlteh_webp_3"},
      {img:"https://sns-webpic-qc.xhscdn.com/202407142124/3a2b092c095068d545f78b71ecfeb183/1040g2sg3121pc3iu3i1g5pfjtmah9a7u3kdq150!nd_dft_wlteh_webp_3"},
      {img:"https://c-ssl.duitang.com/uploads/item/202002/08/20200208034637_hz4HJ.jpeg"},
      {img:"https://cdn.donmai.us/sample/7d/b4/__elysia_and_elysia_honkai_and_1_more_drawn_by_macaroni_0101__sample-7db413e1f173d044760ea7e281633813.jpg"},
      {img:"https://th.bing.com/th/id/OIP.6TFlvYxNI2FD6oaQz9ZuTgHaDU?w=317&h=157&c=7&r=0&o=5&pid=1.7"},
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