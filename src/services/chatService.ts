import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// N8n webhook URL for chat functionality
const WEBHOOK_URL = 'http://localhost:5678/webhook/e11f369d-9500-48cb-857d-e90fa6ee4d1e/chat';

// Generate or retrieve a persistent session ID
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('chatSessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('chatSessionId', sessionId);
  }
  return sessionId;
};

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface ChatResponse {
  message: string;
  messageId: string;
  timestamp: string;
}

export const chatApi = {
  sendMessage: async (message: string): Promise<ChatResponse> => {
    try {
      // Get the session ID for conversation tracking
      const sessionId = getSessionId();

      // Using the n8n webhook URL for chat with consistent sessionId
      const response = await axios.post(WEBHOOK_URL, {
        chatInput: message,
        timestamp: new Date().toISOString(),
        sessionId, // Use consistent session ID for n8n workflow
        key: sessionId, // Adding key parameter as required by n8n
      });

      // Handle n8n response format
      return {
        message: response.data.output || response.data.message || 'No response received',
        messageId: response.data.id || `msg-${Date.now()}`,
        timestamp: response.data.timestamp || new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw new Error('Failed to get a response. Please try again later.');
    }
  },

  getConversationHistory: async (): Promise<ChatMessage[]> => {
    try {
      // Get chat history from localStorage
      const storedHistory = localStorage.getItem('chatHistory');
      if (storedHistory) {
        return JSON.parse(storedHistory);
      }
      return [];
    } catch (error) {
      console.error('Error retrieving chat history:', error);
      return [];
    }
  },

  saveConversationHistory: async (messages: ChatMessage[]): Promise<void> => {
    try {
      // Save chat history to localStorage
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving conversation history:', error);
    }
  },

  clearConversation: async (): Promise<void> => {
    try {
      // Clear chat history from localStorage
      localStorage.removeItem('chatHistory');

      // Notify the n8n workflow that the conversation was cleared
      const sessionId = getSessionId();
      try {
        await axios.post(WEBHOOK_URL, {
          clearConversation: true,
          sessionId,
          key: sessionId,
          timestamp: new Date().toISOString(),
        });
      } catch (apiError) {
        console.warn('Failed to notify n8n of conversation clear:', apiError);
        // Continue even if this fails
      }
    } catch (error) {
      console.error('Error clearing conversation:', error);
      throw new Error('Failed to clear conversation history.');
    }
  },

  // Get the current session ID (for debugging or analytics)
  getSessionId,

  // Reset the session ID (creates a new conversation)
  resetSession: async (): Promise<void> => {
    localStorage.removeItem('chatSessionId');
    localStorage.removeItem('chatHistory');
    // New session ID will be generated on next API call
  },
};
