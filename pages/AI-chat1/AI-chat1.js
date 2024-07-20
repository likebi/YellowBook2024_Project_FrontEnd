Page({
  data: {
    userMessage: '',
    botResponse: '',
    messages: [],
    conversationId: null, // 用于存储当前会话的 ID
    currentMessage: '', // 用于存储当前消息
    savedConversations: [] // 用于存储保存的会话记录
  },

  onLoad() {
    // 初始化，加载保存的会话记录
    const savedConversation = wx.getStorageSync('currentConversation1') || null;
    if (savedConversation) {
      this.setData({
        conversationId: savedConversation.conversationId,
        messages: savedConversation.messages
      });
    }

    const savedConversations = wx.getStorageSync('savedConversations') || [];
    this.setData({ savedConversations });
  },

  bindMessageInput(e) {
    this.setData({
      userMessage: e.detail.value
    });
  },

  sendMessage() {
    const message = this.data.userMessage.trim();
    const apiKey = 'app-kmsUTWTOmDWv8ZqT9vuNrC5I'; // 替换为正确的 API 密钥

    if (message) {
      this.addMessage({ sender: 'user', text: message });

      const requestData = {
        query: message,
        response_mode: "streaming",
        user: "user",
        inputs: {},
        files: [
          {
            type: "image",
            transfer_method: "remote_url",
            url: "https://cloud.dify.ai/logo/logo-site.png"
          }
        ]
      };

      if (this.data.conversationId) {
        requestData.conversation_id = this.data.conversationId;
      }

      wx.request({
        url: 'https://api.dify.ai/v1/chat-messages',
        method: 'POST',
        data: requestData,
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        success: (res) => { // 使用箭头函数以确保 `this` 的上下文
          console.log('响应:', res);
          if (res.statusCode === 200) {
            // 处理流式数据
            this.processStream(res.data);
          } else {
            console.error('请求失败:', res.data);
            this.addMessage({ sender: 'bot', text: `请求失败: ${res.data.message}` });
          }
        },
        fail: (err) => { // 使用箭头函数以确保 `this` 的上下文
          console.error('请求失败:', err);
          this.addMessage({ sender: 'bot', text: '请求失败，请稍后再试。' });
        }
      });

      this.setData({ userMessage: '' });
    }
  },

  processStream(streamData) {
    let currentMessage = this.data.currentMessage;

    const events = streamData.split('\n\n');
    events.forEach(event => {
      if (event.startsWith('data: ')) {
        const jsonData = event.slice(6); // 去掉 'data: '
        try {
          const messageData = JSON.parse(jsonData);
          if (messageData.event === "message") {
            // 将新收到的文本块附加到当前消息
            currentMessage += messageData.answer;
            this.setData({ currentMessage });
          } else if (messageData.event === "message_end") {
            // 消息结束时，将完整消息添加到消息列表
            this.addMessage({ sender: 'bot', text: currentMessage });
            // 清空当前消息
            this.setData({ currentMessage: '' });
          }
          // 保存会话ID
          if (!this.data.conversationId) {
            this.setData({ conversationId: messageData.conversation_id }, this.saveCurrentConversation);
          } else {
            this.saveCurrentConversation();
          }
        } catch (e) {
          console.error('解析错误:', e);
        }
      }
    });
  },

  addMessage(message) {
    this.setData({
      messages: [...this.data.messages, message]
    });
  },

  saveCurrentConversation() {
    const { conversationId, messages } = this.data;
    const currentConversation1 = { conversationId, messages };
    wx.setStorageSync('currentConversation1', currentConversation1);
  },

  saveConversation() {
    const { conversationId, messages } = this.data;
    if (conversationId && messages.length > 0) {
      const savedConversations = wx.getStorageSync('savedConversations') || [];
      savedConversations.push({ conversationId, messages });
      wx.setStorageSync('savedConversations', savedConversations);
      this.setData({ savedConversations });
      wx.showToast({
        title: '会话已保存',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '无有效会话',
        icon: 'none'
      });
    }
  },

  loadConversation(e) {
    const { conversationId, messages } = e.currentTarget.dataset;
    this.setData({
      conversationId,
      messages
    });
    wx.setStorageSync('currentConversation1', { conversationId, messages });
    wx.showToast({
      title: '会话已加载',
      icon: 'success'
    });
  }
});
