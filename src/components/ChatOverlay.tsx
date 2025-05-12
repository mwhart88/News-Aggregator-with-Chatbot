import React, { useState } from 'react';
import { askQuestion } from '../services/backendApi';

interface Source {
  id: string;
  title: string;
  category?: string;
}

interface Message {
  from: 'user' | 'bot';
  text: string;
  sources?: Source[];
}

interface ChatOverlayProps {
  onClose: () => void;
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ onClose }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  const handleSend = async () => {
    if (!question.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { from: 'user', text: question }]);
    
    // Clear input and set loading
    const currentQuestion = question;
    setQuestion('');
    setLoading(true);
    
    try {
      // Call backend API
      console.log('Sending question to backend:', currentQuestion);
      const response = await askQuestion(currentQuestion);
      console.log('Received response from backend:', response);
      
      // Add bot response - validate the response structure
      if (response && response.answer) {
        setMessages(prev => [...prev, { 
          from: 'bot', 
          text: response.answer,
          sources: Array.isArray(response.sources) ? response.sources : []
        }]);
      } else {
        console.error('Invalid response format:', response);
        setMessages(prev => [...prev, { 
          from: 'bot', 
          text: 'Sorry, I received an invalid response format. Please try again.' 
        }]);
      }
    } catch (error) {
      console.error('Error asking question:', error);
      // Create a more detailed error message
      let errorMessage = 'Sorry, I encountered an error trying to answer your question.';
      if (error instanceof Error) {
        errorMessage += ' Details: ' + error.message;
      }
      
      setMessages(prev => [...prev, { 
        from: 'bot', 
        text: errorMessage
      }]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md h-3/4 rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">News Chat</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <p>Ask a question about today's news!</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                msg.from === 'user' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}>
                <p>{msg.text}</p>
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-xs font-semibold">Sources:</p>
                    <ul className="text-xs list-disc list-inside">
                      {msg.sources.map((source, idx) => (
                        <li key={idx}>
                          {source.title || source.id}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about today's news..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleSend}
              disabled={loading || !question.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOverlay; 