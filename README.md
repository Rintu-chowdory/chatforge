# ChatForge

A modern AI Chat Interface SaaS application built with React, Vite, and Tailwind CSS.

## Features

- **Dark Theme UI**: Sleek dark mode with emerald/green accents (#10b981)
- **Multi-Conversation Support**: Manage multiple chat conversations in the sidebar
- **Model Selector**: Switch between GPT-4, Claude 3, and Gemini Pro
- **Advanced Settings**: Temperature and max tokens sliders
- **Markdown Rendering**: Full markdown support with syntax-highlighted code blocks
- **Responsive Design**: Mobile-friendly interface with collapsible sidebar
- **Usage Dashboard**: Track token usage and estimated costs
- **Mock Behavior**: Pre-built mock responses for demonstration

## Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Styling
- **React Router 6** - Navigation
- **Lucide React** - Icons
- **React Markdown** - Markdown rendering
- **Highlight.js** - Code syntax highlighting

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/Rintu-chowdory/chatforge.git
cd chatforge
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173/chatforge](http://localhost:5173/chatforge) in your browser.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Project Structure

```
chatforge/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── CodeBlock.jsx
│   │   └── SettingsPanel.jsx
│   ├── pages/
│   │   ├── Chat.jsx
│   │   ├── Conversations.jsx
│   │   ├── Settings.jsx
│   │   └── UsageDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Pages

### Chat Interface
- Main page with conversation view
- Message bubbles for user and AI
- Typing indicator animation
- Real-time message sending with mock responses
- Copy, thumbs up/down buttons on messages

### Conversations
- List view of all conversations
- Search functionality
- Message count per conversation
- Creation date display

### Settings
- API key management (masked for security)
- Model defaults configuration
- Theme selection (Dark/Light)
- Usage statistics display
- Danger zone actions

### Usage Dashboard
- Total tokens used this month
- Estimated cost calculation
- Per-model usage breakdown
- Daily activity chart

## Features

### Chat Interface
- Multiple conversations in sidebar
- Real-time message updates
- Typing animation
- Message timestamps
- Copy to clipboard
- Thumbs up/down feedback

### Model Management
- Switch between models: GPT-4, Claude 3, Gemini Pro
- Temperature control (0-2)
- Max tokens slider (100-4000)

### Markdown & Code
- Full markdown support
- Syntax-highlighted code blocks
- Inline code formatting
- Lists, blockquotes, links

## Deployment

This app is configured for GitHub Pages deployment.

### GitHub Pages Setup

1. The `vite.config.js` is configured with `base: '/chatforge/'`
2. GitHub Actions workflow automatically builds and deploys on push to `main`
3. View the deployed app at: `https://Rintu-chowdory.github.io/chatforge/`

## Mock Data

The app comes with 4 pre-loaded example conversations:
1. React Component Design
2. JavaScript Async/Await
3. CSS Grid Layout
4. API Design Patterns

When you send a message, the app simulates a 1.5-2 second delay then displays a mock AI response.

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  'chat-bg': '#0d1117',
  'chat-dark': '#161b22',
  'emerald': '#10b981',
}
```

### API Integration
To connect real APIs:
1. Replace mock responses in `Chat.jsx` with actual API calls
2. Add your API keys to Settings page
3. Update `handleSendMessage` to call your backend

## License

MIT

## Author

Built with ❤️ by Rintu Chowdory
