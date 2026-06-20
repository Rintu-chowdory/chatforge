import React, { useState, useRef, useEffect } from 'react'
import { Send, Menu, Settings, ChevronDown } from 'lucide-react'
import MessageBubble from '../components/MessageBubble'
import SettingsPanel from '../components/SettingsPanel'

const MOCK_RESPONSES = [
  'That is an interesting question. Let me break it down for you: The concept is built on fundamental principles that have proven effective in many scenarios. Consider the following approach...',
  'Great question! I would recommend focusing on these key areas: First, establish a clear understanding of the requirements. Then, implement the solution step by step. Finally, test thoroughly to ensure everything works as expected.',
  'Based on best practices, the most effective solution would be to leverage modern tools and frameworks. Here\'s a code example that demonstrates this approach...',
  'This is a complex topic with multiple valid approaches. The best choice depends on your specific use case and constraints. I recommend considering factors like performance, maintainability, and scalability.'
]

function Chat({ conversation, onUpdateConversation, model, sidebarOpen, onToggleSidebar }) {
  const [messages, setMessages] = useState(conversation?.messages || [])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 2000,
  })
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setMessages(conversation?.messages || [])
  }, [conversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const mockResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        content: mockResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      const finalMessages = [...newMessages, aiMessage]
      setMessages(finalMessages)
      setIsTyping(false)

      if (conversation) {
        onUpdateConversation({
          ...conversation,
          messages: finalMessages,
          title: userMessage.content.substring(0, 50)
        })
      }
    }, 1500)
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-chat-bg">
      {/* Header */}
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-gray-400 hover:text-gray-200 transition"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">
              {conversation?.title || 'New Conversation'}
            </h1>
            <p className="text-xs text-gray-500">{model.toUpperCase()}</p>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-gray-400 hover:text-emerald transition p-2 rounded-lg hover:bg-gray-700/50"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-emerald/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🔥</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">ChatForge</h2>
            <p className="text-gray-400 max-w-md">Start a new conversation by typing a message below. I'm here to help with any questions you have.</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                model={model}
              />
            ))}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 bg-chat-dark px-4 lg:px-8 py-4">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-chat-bg border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-emerald hover:bg-emerald/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg px-4 py-3 transition flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">Press Enter to send</p>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}

export default Chat
