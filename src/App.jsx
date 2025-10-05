import React, { useState } from 'react';
import PasswordChecker from './components/PasswordChecker';
import PasswordGenerator from './components/PasswordGenerator';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [activeTab, setActiveTab] = useState('checker');

  const tabs = [
    { id: 'checker', label: 'Password Checker', icon: '🔍' },
    { id: 'generator', label: 'Password Generator', icon: '🎲' }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'checker':
        return <PasswordChecker />;
      case 'generator':
        return <PasswordGenerator />;
      default:
        return <PasswordChecker />;
    }
  };

  return (
    <div className="min-h-screen bg-primary-light dark:bg-primary-dark transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🔐</div>
              <div>
                <h1 className="text-2xl font-bold text-primary-blue">Passly</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Smart. Secure. Simple.</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-blue text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {renderActiveComponent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              Made with ❤️ for password security. Passly helps you create and manage secure passwords.
            </p>
            <p className="text-xs mt-2">
              Powered by Have I Been Pwned API for breach detection.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
