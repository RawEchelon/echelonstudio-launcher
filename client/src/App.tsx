import React, { useState } from 'react'
import ModpackBrowser from './components/ModpackBrowser'
import ModpackCreator from './components/ModpackCreator'

function App() {
  const [currentView, setCurrentView] = useState<'browser' | 'creator'>('browser')

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-frozia-500">
              EchelonStudio Launcher
            </h1>
            <span className="text-sm text-gray-400">Modpack Manager</span>
          </div>
          
          <nav className="flex space-x-4">
            <button
              onClick={() => setCurrentView('browser')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'browser'
                  ? 'bg-frozia-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Browse Modpacks
            </button>
            <button
              onClick={() => setCurrentView('creator')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'creator'
                  ? 'bg-frozia-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Create Modpack
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {currentView === 'browser' && <ModpackBrowser />}
        {currentView === 'creator' && <ModpackCreator />}
      </main>
    </div>
  )
}

export default App