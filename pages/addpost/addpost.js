Page({
  data: {
    arrowl: '<',
    arrowr: '>',
    arrow3: '▼',
    plus: '/static/plus-icon.png',
    htag: '/static/htag.png',
    location: '/static/position.png',
    images: [], // 用于存储已上传的图片
    showpostElement: false,
    dropdownVisibleHeader: false,
    inputText:'',
    threeoptions: [
      { values:'1', selectOption: '酒店' },
      { values:'2', selectOption: '旅游' },
      { values:'3', selectOption: '美食' },
    ],
    options: [], // 初始化为空数组
    selectedLocation: '', // console返回values
    selectedHeader: '',// console返回values
    arrowIcon: '▼'

  },

    // 页面加载时请求地点数据
    onLoad() {
      const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
      if (token) {
        this.fetchLocations(token);
      } else {
        console.error('未找到授权 token');
      }
    },
  // 返回首页
  onBack() {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  },

  savePost_image() {
    wx.setStorageSync('Post_image', this.data.images);
  },

  savePost_Title() {
    wx.setStorageSync('Post_title', this.data.title);
  },

  savePost_Content() {
    wx.setStorageSync('Post_content', this.data.content);
  },

  savePost_Location() {
    wx.setStorageSync('Post_location', this.data.selectedLocation);
  },

  savePost_Tag() {
    wx.setStorageSync('Post_tag', this.data.selectedTag);
  },
  // Function to handle suggestion click
  onSuggestionClick(event) {
    const selectedValue = event.currentTarget.dataset.value; // Get the value of the clicked suggestion
    this.setData({
      inputText: `${this.data.inputText} ${selectedValue}` // Append the selected suggestion to existing text `${this.data.inputText} = insert value of suggested header when click moscow --> (#moscow) ${selectedValue} = append again value when click 北京 ---> (#北京) together (#moscow) (#北京)
    })
  },

  // Function to handle textarea input
  handleContent(event) {
    // Update the inputText property with textarea value
    const newValue = event.detail.value;
    this.setData({
      inputText: newValue // Update the inputText property with textarea value
    })
  },
  //显示隐藏的输入框
  toggle_post_element: function() {
    console.log('Toggling dropdown:', !this.data.dropdownVisible);
    this.setData({
      showpostElement: !this.data.showpostElement
    })
  },
  // 显示用户输入东西在屏幕
  onInputChange: function(event) {
    const inputValue = event.detail.value;
    console.clear(); // Clear the console before logging the new value
    console.log('Typing value:', inputValue); // print the typing value
    this.setData({
        inputText: inputValue
    })
  },
  toggle_dropdownHeader() {
    this.setData({
      dropdownVisibleHeader: !this.data.dropdownVisibleHeader
    });
  },
  // 显示菜单
  toggleDropdown: function() {
    console.log('Toggling dropdown:', !this.data.dropdownVisible);
    this.setData({
      dropdownVisible: !this.data.dropdownVisible,
    });
  },
  // 点击城市然后返回Value并关闭菜单
  onOptionSelect: function(event) {
    const selectedValue = event.currentTarget.dataset.value;
    const selectedOption = this.data.options.find(option => option.value === selectedValue);
    console.log('Selected option:', selectedOption);
    if (selectedOption) {
      this.setData({
        selectedLocation: selectedOption.locations, // Update the displayed location
        dropdownVisible: false, // Hide the dropdown menu after selection
      });
    }
    // this.setData({
    //   selectedLocation: selectedOption,
    //   dropdownVisible: false,
    // })
  },
  onOptionSelectHeader(event) {
    const selectedValue = event.currentTarget.dataset.value;
    const selectedOption = this.data.threeoptions.find(option => option.values === selectedValue);
    //this.data.(this fucntion data is in threeoptions) ---> array data 
    //find method search element in array (find(option => option.(values is the name in the data) === selectedValue);)
    //function(option) {
    //    return option.values === selectedValue;
     //   }
    console.log('Selected Header Option:', selectedOption);
    this.setData({
      selectedHeader: selectedOption.selectOption, 
      dropdownVisibleHeader: false,
    })
  },

  addImage() {
    const that = this;
    wx.chooseImage({
      count: 4 - that.data.images.length, // 限制最多选择4张
      success(res) {
        const newImages = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(newImages) // 添加新图片
        }, () => {
          that.savePost_image(); // 保存图片到本地存储
        });
      },
    });
  },

  // 删除图片
  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images: images
    }, () => {
      this.savePost_image(); // 保存修改后的图片数组到本地存储
    });
  },

  handleInput(e){
    console.log(e);
    this.setData({
      title: e.detail.value
    });
    this.savePost_Title();
  },

  handleContent(e){
    console.log(e);
    this.setData({
      content: e.detail.value
    });
    this.savePost_Content();
  },

  fetchLocations(token) {
    wx.request({
      url: 'http://localhost:3000/locations',
      method: 'GET',
      header: {
        'Authorization': token
      },
      success: (res) => {
        if (res.data.code === 200) {
          const formattedOptions = res.data.data.map((item, index) => ({
            value: (index + 1).toString(), // 生成唯一的值，例如 '1', '2', '3'...
            locations: item.id
          }));
          this.setData({
            options: formattedOptions // 更新地点数据
          });
        } else {
          console.error('Failed to fetch locations:', res.data.msg);
        }
      },
      fail: (err) => {
        console.error('Failed to fetch locations:', err);
      }
    });
  },

  submitPost() {
    const token = wx.getStorageSync('userToken');
    wx.request({
      url: 'http://localhost:3000/post/userpost', // 替换为你后端的帖子创建接口
      method: 'POST',
      header: {
        'Authorization': token, 
        'Content-Type': 'application/json' // 确保格式正确
      },
      data: {
        images: this.data.images,
        title: this.data.title,
        content: this.data.content,
        location: this.data.selectedLocation,
        tag: this.data.selectedTag
      },
      success(res) {
        console.log('发布成功:', res.data);
        // 处理发布成功后的逻辑
        wx.navigateBack({
          delta: 0,
          success: (res) => {},
          fail: (res) => {},
          complete: (res) => {},
        })
      },
      fail(err) {
        console.log('发布失败:', err);
        // 处理发布失败后的逻辑
      }
    });
  }  
});
