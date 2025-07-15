import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { WalletProvider } from './context/WalletContext'  // ✅ Import this

ReactDOM.createRoot(document.getElementById('root')).render(
    <WalletProvider>
      <App />
    </WalletProvider>
)
