import React, { useState } from 'react';
import { generateRandomPassword, strengthenBaseWord, generateWithCustomSymbols } from '../utils/generatorUtils';

const PasswordGenerator = () => {
  const [mode, setMode] = useState('random');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Random password options
  const [randomOptions, setRandomOptions] = useState({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  });
  
  // Base word mode
  const [baseWord, setBaseWord] = useState('');
  
  // Custom symbols mode
  const [customSymbols, setCustomSymbols] = useState('!@#$%');

  const generatePassword = () => {
    try {
      let password = '';
      
      switch (mode) {
        case 'random':
          password = generateRandomPassword(randomOptions);
          break;
        case 'baseword':
          password = strengthenBaseWord(baseWord);
          break;
        case 'custom':
          password = generateWithCustomSymbols(baseWord, customSymbols);
          break;
        default:
          password = generateRandomPassword(randomOptions);
      }
      
      setGeneratedPassword(password);
      setShowPassword(true);
    } catch (error) {
      console.error('Error generating password:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-primary-blue">Smart Password Generator</h2>
      
      <div className="space-y-6">
        {/* Mode Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Generation Mode:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setMode('random')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                mode === 'random'
                  ? 'border-primary-blue bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="text-sm font-medium">🎲 Fully Random</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Complete randomness</div>
            </button>
            
            <button
              onClick={() => setMode('baseword')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                mode === 'baseword'
                  ? 'border-primary-blue bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="text-sm font-medium">🔤 Base Word</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Strengthen existing word</div>
            </button>
            
            <button
              onClick={() => setMode('custom')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                mode === 'custom'
                  ? 'border-primary-blue bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="text-sm font-medium">🎨 Custom Symbols</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Use your symbols</div>
            </button>
          </div>
        </div>

        {/* Mode-specific Options */}
        {mode === 'random' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Random Password Options:</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Length: {randomOptions.length}</label>
              <input
                type="range"
                min="8"
                max="32"
                value={randomOptions.length}
                onChange={(e) => setRandomOptions({...randomOptions, length: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={randomOptions.includeUppercase}
                  onChange={(e) => setRandomOptions({...randomOptions, includeUppercase: e.target.checked})}
                  className="mr-2"
                />
                Uppercase (A-Z)
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={randomOptions.includeLowercase}
                  onChange={(e) => setRandomOptions({...randomOptions, includeLowercase: e.target.checked})}
                  className="mr-2"
                />
                Lowercase (a-z)
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={randomOptions.includeNumbers}
                  onChange={(e) => setRandomOptions({...randomOptions, includeNumbers: e.target.checked})}
                  className="mr-2"
                />
                Numbers (0-9)
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={randomOptions.includeSymbols}
                  onChange={(e) => setRandomOptions({...randomOptions, includeSymbols: e.target.checked})}
                  className="mr-2"
                />
                Symbols (!@#$)
              </label>
            </div>
          </div>
        )}

        {mode === 'baseword' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Base Word Mode:</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Enter base word:</label>
              <input
                type="text"
                value={baseWord}
                onChange={(e) => setBaseWord(e.target.value)}
                placeholder="e.g., football"
                className="input-field"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Example: football → F00tB@ll!92
              </p>
            </div>
          </div>
        )}

        {mode === 'custom' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Custom Symbols Mode:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Base word:</label>
                <input
                  type="text"
                  value={baseWord}
                  onChange={(e) => setBaseWord(e.target.value)}
                  placeholder="e.g., travel"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Custom symbols:</label>
                <input
                  type="text"
                  value={customSymbols}
                  onChange={(e) => setCustomSymbols(e.target.value)}
                  placeholder="e.g., !@#"
                  className="input-field"
                />
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Example: base "travel", symbols "!@" → Tr@v3l!7
            </p>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="btn-primary w-full py-3 text-lg"
        >
          Generate Password
        </button>

        {/* Generated Password Display */}
        {generatedPassword && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Generated Password:</h3>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={generatedPassword}
                readOnly
                className="input-field pr-20 font-mono"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  onClick={copyToClipboard}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="Copy password"
                >
                  📋
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
