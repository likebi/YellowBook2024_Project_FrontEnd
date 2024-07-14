// pages/editGender/editGender.js
Page({

  data: {
    selectedGender: '', 
  },

  selectGender: function (event) {
    const gender = event.currentTarget.dataset.gender; 
    this.setData({
      selectedGender: gender 
    });
    this.updateView();
  },

  updateView: function () {
    console.log("当前选择的性别是: " + this.data.selectedGender);
  },

  submitGender: function () {
    const selectedGender = this.data.selectedGender;
    if (selectedGender) {
      console.log("提交的性别是: " + selectedGender);
    } else {
      console.log("请先选择性别");
    }
  }
});
