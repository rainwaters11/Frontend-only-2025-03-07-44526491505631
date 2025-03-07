import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import VoiceFeatures from './VoiceFeatures.jsx';

// Simple 2D avatar component
const SimpleAvatar = ({ botState, sentiment = 0 }) => {
  // Get expression based on bot state and sentiment
  const getExpression = () => {
    if (botState === 'listening') return '👂';
    if (botState === 'thinking') return '🤔';
    if (botState === 'speaking') return '🗣️';
    
    // Idle state - use sentiment
    if (sentiment > 0.3) return '😊';
    if (sentiment < -0.3) return '😔';
    return '😐';
  };
  
  return (
    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-8xl animate-pulse">
        {getExpression()}
      </div>
    </div>
  );
};

function App() {
  // State variables
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [botState, setBotState] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSentiment, setCurrentSentiment] = useState(0);
  
  // Speech feature states
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [currentBotResponse, setCurrentBotResponse] = useState('');
  const [isProcessingSpeech, setIsProcessingSpeech] = useState(false);
  
  // Add welcome message on first load
  useEffect(() => {
    setMessages([
      { 
        text: "Hi there! I'm VentBot. Feel free to share what's on your mind. You can type or click the microphone icon to speak.", 
        isUser: false 
      }
    ]);
  }, []);
  
  // Mock response function (simulating backend)
  const getMockResponse = (userMessage) => {
    const responses = [
      { text: "I understand how you feel. Tell me more about that.", sentiment: 0.1 },
      { text: "That sounds challenging. How did that make you feel?", sentiment: -0.2 },
      { text: "I'm here to listen. Would you like to elaborate?", sentiment: 0 },
      { text: "Thank you for sharing that with me. What else is on your mind?", sentiment: 0.3 },
      { text: "I see. And how are you handling that situation?", sentiment: -0.1 },
      { text: "That's interesting. Have you considered a different perspective?", sentiment: 0.2 },
      { text: "I appreciate you opening up. Is there something specific about this that bothers you?", sentiment: -0.3 }
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  // Process the user's input and get response
  const processMessage = async (userMessage) => {
    if (!userMessage.trim()) return;
    
    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    
    // Update avatar state
    setBotState('listening');
    setTimeout(() => setBotState('thinking'), 1000);
    
    setIsLoading(true);
    
    // Simulate backend processing
    setTimeout(() => {
      setBotState('speaking');
      
      const response = getMockResponse(userMessage);
      
      // Add bot response to chat
      setMessages(prev => [...prev, { 
        text: response.text, 
        isUser: false 
      }]);
      
      // Set current response for speech synthesis
      setCurrentBotResponse(response.text);
      
      // Update sentiment
      setCurrentSentiment(response.sentiment);
      
      // Return to idle state after speaking
      setTimeout(() => {
        setBotState('idle');
      }, 2000);
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    processMessage(input);
    setInput('');
  };
  
  // Handle speech recognition result
  const handleSpeechInput = (transcript) => {
    if (isProcessingSpeech) return;
    
    setIsProcessingSpeech(true);
    processMessage(transcript);
    setTimeout(() => setIsProcessingSpeech(false), 1000);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto py-4 px-6 flex items-center">
          <div className={`w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-2xl text-white mr-3 ${
            botState === 'thinking' ? 'animate-bounce' : 
            botState === 'listening' ? 'animate-pulse' : 
            botState === 'speaking' ? 'animate-pulse' : ''
          }`}>
            {botState === 'thinking' ? '🤔' : 
             botState === 'listening' ? '👂' : 
             botState === 'speaking' ? '🗣️' : '😊'}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">VentBot</h1>
          
          <div className="ml-auto flex items-center">
            <span className="mr-2 text-sm text-gray-600">Voice Mode</span>
            <label className="relative inline-block w-12 h-6">
              <input 
                type="checkbox" 
                className="opacity-0 w-0 h-0"
                checked={voiceEnabled} 
                onChange={() => setVoiceEnabled(!voiceEnabled)}
              />
              <span className={`absolute cursor-pointer inset-0 rounded-full transition-colors ${voiceEnabled ? 'bg-purple-600' : 'bg-gray-300'}`}>
                <span className={`absolute w-5 h-5 rounded-full bg-white left-0.5 top-0.5 transition-transform ${voiceEnabled ? 'transform translate-x-6' : ''}`}></span>
              </span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row max-w-6xl mx-auto w-full p-4 gap-4">
        {/* Avatar Section */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 text-center font-medium text-lg border-b border-gray-200 bg-purple-600 text-white">
            Virtual Assistant
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center">
            <SimpleAvatar botState={botState} sentiment={currentSentiment} />
            
            <div className="mt-4 text-center text-sm text-gray-500 font-medium">
              {botState === 'listening' && 'Listening...'}
              {botState === 'thinking' && 'Thinking...'}
              {botState === 'speaking' && 'Speaking...'}
              {botState === 'idle' && 'Ready to chat'}
            </div>
          </div>
        </div>
        
        {/* Chat Section */}
        <div className="w-full md:w-2/3 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-purple-600 text-white p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-xl mr-3">
              🤖
            </div>
            <div>
              <div className="font-medium">VentBot</div>
              <div className="text-xs opacity-80">AI Assistant</div>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isUser && (
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white mr-2">
                    🤖
                  </div>
                )}
                <div 
                  className={`px-4 py-2 rounded-lg max-w-xs sm:max-w-md ${
                    msg.isUser 
                      ? 'bg-purple-600 text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white ml-2">
                    👤
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white mr-2">
                  🤖
                </div>
                <div className="px-4 py-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                disabled={isLoading}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="bg-purple-600 text-white py-2 px-6 rounded-r-full disabled:bg-purple-300"
              >
                Send
              </button>
            </form>
          </div>
          
          {/* Voice Features */}
          {voiceEnabled && (
            <div className="p-4 border-t border-gray-200">
              <VoiceFeatures
                isEnabled={voiceEnabled}
                onUserSpeech={handleSpeechInput}
                onListeningStart={() => setBotState('listening')}
                onListeningEnd={() => setBotState('idle')}
                botResponse={currentBotResponse}
                onSpeakingStart={() => setBotState('speaking')}
                onSpeakingEnd={() => {
                  setBotState('idle');
                  setCurrentBotResponse('');
                }}
                voiceOptions={{
                  rate: 1.0,
                  pitch: 1.0,
                  volume: 1.0
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);