import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Copy, Moon, Sun } from 'lucide-react'

function Settings() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState('sk-proj-abc123def456ghi789jkl***')
  const [theme, setTheme] = useState('dark')
  const [copied, setCopied] = useState(false)

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex-1 h-screen flex flex-col bg-chat-bg">
      {/* Header */}
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-emerald hover:text-emerald/80 transition mb-4"
        >
          <ArrowLeft size={18} />
          Back to Chat
        </Link>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 max-w-2xl">
        {/* API Keys Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">API Keys</h2>
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6">
            <label className="block text-sm font-semibold text-gray-100 mb-3">
              OpenAI API Key
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  readOnly
                  className="w-full bg-chat-bg border border-gray-600 rounded-lg px-4 py-2 text-gray-200 font-mono text-sm"
                />
              </div>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-gray-400 hover:text-gray-200 transition p-2 rounded hover:bg-gray-700"
              >
                {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button
                onClick={handleCopyApiKey}
                className="text-gray-400 hover:text-emerald transition p-2 rounded hover:bg-gray-700"
                title="Copy API key"
              >
                <Copy size={18} />
              </button>
            </div>
            {copied && <p className="text-xs text-emerald mt-2">Copied to clipboard!</p>}
            <p className="text-xs text-gray-400 mt-3">
              Your API key is masked for security. Get your key from{' '}
              <a href="#" className="text-emerald hover:underline">
                OpenAI Dashboard
              </a>
            </p>
          </div>
        </div>

        {/* Model Defaults Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Model Defaults</h2>
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-100 mb-2">
                Default Model
              </label>
              <select className="w-full bg-chat-bg border border-gray-600 rounded-lg px-4 py-2 text-gray-200 cursor-pointer hover:border-emerald transition">
                <option>GPT-4</option>
                <option>Claude 3</option>
                <option>Gemini Pro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-100 mb-2">
                Default Temperature
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                defaultValue="0.7"
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald"
              />
              <p className="text-xs text-gray-400 mt-2">0 = Focused, 2 = Creative</p>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Theme</h2>
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  theme === 'dark'
                    ? 'bg-emerald text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Moon size={18} />
                Dark
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  theme === 'light'
                    ? 'bg-emerald text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Sun size={18} />
                Light
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Currently using <strong>{theme}</strong> theme
            </p>
          </div>
        </div>

        {/* Usage Stats Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Usage Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-chat-dark border border-gray-700 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">This Month</p>
              <p className="text-2xl font-bold text-emerald">23.5K</p>
              <p className="text-xs text-gray-500 mt-1">Tokens Used</p>
            </div>
            <div className="bg-chat-dark border border-gray-700 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Estimated Cost</p>
              <p className="text-2xl font-bold text-emerald">$0.47</p>
              <p className="text-xs text-gray-500 mt-1">USD</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
          <div className="bg-red-950/20 border border-red-900 rounded-lg p-6">
            <button className="text-red-400 hover:text-red-300 transition font-semibold">
              Clear All Conversations
            </button>
            <p className="text-xs text-gray-400 mt-2">
              This action cannot be undone. All conversation history will be permanently deleted.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
