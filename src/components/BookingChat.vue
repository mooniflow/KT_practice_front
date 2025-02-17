<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>{{ chatPartner }} 님과의 대화</h2>
    </div>
    
    <div class="chat-messages" ref="messageContainer">
      <div v-for="message in messages" :key="message.id" 
           :class="['message', message.senderId === currentUser.id ? 'sent' : 'received']">
        <div class="message-content">
          {{ message.content }}
        </div>
        <div class="message-time">
          {{ formatTime(message.timestamp) }}
        </div>
      </div>
    </div>

    <div class="chat-input">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="메시지를 입력하세요...">
      <button @click="sendMessage">전송</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      chatPartner: '펫시터',
      socket: null
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    },
    sendMessage() {
      if (!this.newMessage.trim()) return;
      
      // 웹소켓을 통한 메시지 전송 로직
      this.socket.send(JSON.stringify({
        content: this.newMessage,
        senderId: this.currentUser.id,
        timestamp: new Date()
      }));
      
      this.newMessage = '';
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    }
  },
  mounted() {
    // 웹소켓 연결 로직
    this.socket = new WebSocket('ws://localhost:8080/chat');
    
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messages.push(message);
      this.scrollToBottom();
    };
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  }
};
</script>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chat-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.message {
  margin-bottom: 10px;
  max-width: 70%;
}

.sent {
  margin-left: auto;
  text-align: right;
}

.received {
  margin-right: auto;
}

.message-content {
  padding: 10px;
  border-radius: 8px;
  background: #f0f0f0;
  display: inline-block;
}

.sent .message-content {
  background: #007bff;
  color: white;
}

.message-time {
  font-size: 0.8em;
  color: #666;
  margin-top: 5px;
}

.chat-input {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.chat-input button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 