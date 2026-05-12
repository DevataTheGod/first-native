import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  senderType: 'chef' | 'user';
  text: string;
  timestamp: string;
}

interface ChatStore {
  messages: Record<string, ChatMessage[]>;
  addMessage: (orderId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  getMessages: (orderId: string) => ChatMessage[];
  clearChat: (orderId: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: {},

  addMessage: (orderId, messageData) => {
    const message: ChatMessage = {
      ...messageData,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    const orderMessages = get().messages[orderId] || [];
    const updatedMessages = { ...get().messages, [orderId]: [...orderMessages, message] };
    set({ messages: updatedMessages });
    AsyncStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
  },

  getMessages: (orderId) => {
    return get().messages[orderId] || [];
  },

  clearChat: (orderId) => {
    const updatedMessages = { ...get().messages };
    delete updatedMessages[orderId];
    set({ messages: updatedMessages });
    AsyncStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
  },
}));
