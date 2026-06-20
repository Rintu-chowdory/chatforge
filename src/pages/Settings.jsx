import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Save, CheckCircle, ExternalLink } from 'lucide-react'

function Settings() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)
  const [model, setModel] = useState('GPT-4o')
  const [temperature, setTemperature] = useState(0.7)

  useEffect(() => {
    const stored = localStorage.getItem('chatforge_openai_key')
    if (stored) setApiKey(stored)
    const storedModel = localStorage.getItem('chatforge_model')
    if (storedModel) setModel(storedModel)
    const storedTemp = localStorage.getItem('chatforge_temperature')
    if (storedTemp) setTemperature(parseFloat(storedTemp))
  }, [])

  const handleSave = () => {
    localStorage.setItem('chatforge_openai_key', apiKey)
    localStorage.setItem('chatforge_model', model)
    localStorage.setItem('chatforge_temperature', temperature)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex-1 h-screen flex flex-col bg-chat-bg">
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-8 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald hover:text-emerald/80 transition mb-4">
          <ArrowLeft size={18} />
          Back to Chat
        </Link>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 max-w-2xl">
        {/* API Keys */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-1">API Keys</h2>
          <p className="text-sm text-gray-400 mb-4">Keys are stored only in your browser (localStorage). Never sent to any server.</p>
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6">
            <label className="block text-sm font-semibold text-gray-100 mb-3">
              OpenAI API Key
            </label>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="w-full bg-chat-bg border border-gray-600 rounded-lg px-4 py-2 text-gray-200 font-mono text-sm focus:outline-none focus:border-emerald transition"
                />
              </div>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-gray-400 hover:text-gray-200 transition p-2 rounded hover:bg-gray-700"
              >
                {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-emerald hover:underline"
            >
              Get your API key from OpenAI <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Model Defaults */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Model Defaults</h2>
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-100 mb-2">Default Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-chat-bg border border-gray-600 rounded-lg px-4 py-2 text-gray-200 cursor-pointer hover:border-emerald transition focus:outline-none focus:border-emerald"
              >
                <option>GPT-4o</option>
                <option>GPT-4</option>
                <option>GPT-3.5</option>
              </select>
              <p className="text-xs text-gray-400 mt-2">GPT-4o is recommended — fast, smart, and cost-effective.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-100 mb-2">
                Temperature: {temperature}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald"
              />
              <p className="text-xs text-gray-400 mt-2">0 = Focused & deterministic · 2 = Creative & varied</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-emerald hover:bg-emerald/90 text-white font-semibold px-6 py-3 rounded-lg transition mb-8"
        >
          {saved ? <CheckCircle size={18} /> : <Save size={18} />}
          {saved ? 'Saved!' : 'Save Settings'}
        </button>

        {/* Danger Zone */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
          <div className="bg-red-950/20 border border-red-900 rounded-lg p-6">
            <button
              onClick={() => {
                localStorage.removeItem('chatforge_openai_key')
                setApiKey('')
              }}
              className="text-red-400 hover:text-red-300 transition font-semibold"
            >
              Remove API Key
            </button>
            <p className="text-xs text-gray-400 mt-2">Removes your stored API key from this browser.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
