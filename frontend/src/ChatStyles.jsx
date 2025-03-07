import React from 'react';

const ChatStyles = () => {
  return (
    <style jsx="true">{`
      .chat-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #fff;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      
      .chat-header {
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: #8B5CF6;
        color: white;
      }
      
      .chat-messages {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .message {
        max-width: 80%;
        padding: 0.75rem 1rem;
        border-radius: 1rem;
        animation: fadeIn 0.3s ease-out;
      }
      
      .message-container {
        display: flex;
        align-items: flex-end;
      }
      
      .user-message {
        background-color: #8B5CF6;
        color: white;
        border-bottom-right-radius: 0.25rem;
        margin-left: auto;
      }
      
      .bot-message {
        background-color: #F3F4F6;
        color: #1F2937;
        border-bottom-left-radius: 0.25rem;
      }
      
      .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin: 0 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .bot-avatar {
        background-color: #8B5CF6;
        color: white;
      }
      
      .user-avatar {
        background-color: #9CA3AF;
        color: white;
      }
      
      .typing-indicator {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
      }
      
      .typing-indicator span {
        height: 0.5rem;
        width: 0.5rem;
        background-color: #9CA3AF;
        border-radius: 50%;
        display: inline-block;
        margin: 0 0.1rem;
      }
      
      .typing-indicator span:nth-child(1) {
        animation: bounce 1s infinite;
      }
      
      .typing-indicator span:nth-child(2) {
        animation: bounce 1s infinite 0.2s;
      }
      
      .typing-indicator span:nth-child(3) {
        animation: bounce 1s infinite 0.4s;
      }
      
      .chat-input {
        padding: 1rem;
        border-top: 1px solid #E5E7EB;
      }
      
      .input-form {
        display: flex;
        gap: 0.5rem;
      }
      
      .input-field {
        flex: 1;
        padding: 0.75rem 1rem;
        border-radius: 9999px;
        border: 1px solid #E5E7EB;
        outline: none;
        transition: border-color 0.3s;
      }
      
      .input-field:focus {
        border-color: #8B5CF6;
        box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
      }
      
      .send-button {
        background-color: #8B5CF6;
        color: white;
        border: none;
        border-radius: 9999px;
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .send-button:hover {
        background-color: #7C3AED;
      }
      
      .send-button:disabled {
        background-color: #C4B5FD;
        cursor: not-allowed;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }
      
      .avatar-container {
        position: relative;
        background-color: white;
        border-radius: 0.5rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      
      .avatar-header {
        padding: 1rem;
        text-align: center;
        border-bottom: 1px solid #E5E7EB;
        font-weight: 500;
        color: #4B5563;
      }
      
      .large-avatar {
        max-width: 100%;
        height: 16rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .avatar-expression {
        font-size: 8rem;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
      }
      
      .avatar-status {
        text-align: center;
        padding: 0.5rem;
        color: #6B7280;
        font-size: 0.875rem;
      }
      
      @keyframes pulse {
        0% {
          transform: scale(0.98);
        }
        50% {
          transform: scale(1.02);
        }
        100% {
          transform: scale(0.98);
        }
      }
    `}</style>
  );
};

export default ChatStyles;