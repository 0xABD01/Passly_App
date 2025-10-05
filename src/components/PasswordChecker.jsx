import React, { useState, useEffect } from 'react';
import { calculatePasswordStrength, getStrengthColor, getStrengthWidth } from '../utils/strengthUtils';
import { checkPasswordBreach } from '../utils/hashUtils';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [breachData, setBreachData] = useState(null);
  const [isCheckingBreach, setIsCheckingBreach] = useState(false);
  const [strengthData, setStrengthData] = useState({ score: 0, level: 'weak', suggestions: [] });

  useEffect(() => {
    const strength = calculatePasswordStrength(password);
    setStrengthData(strength);
    
    // Debounce breach checking
    if (password.length > 0) {
      const timeoutId = setTimeout(async () => {
        setIsCheckingBreach(true);
        const breach = await checkPasswordBreach(password);
        setBreachData(breach);
        setIsCheckingBreach(false);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    } else {
      setBreachData(null);
    }
  }, [password]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-primary-blue">Password Strength & Breach Checker</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to check..."
            className="input-field pr-20"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
            {password && (
              <button
                onClick={copyToClipboard}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Copy password"
              >
                📋
              </button>
            )}
          </div>
        </div>

        {/* Strength Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Strength:</span>
            <span className={`text-sm font-semibold capitalize ${
              strengthData.level === 'weak' ? 'text-accent-red' :
              strengthData.level === 'medium' ? 'text-accent-orange' :
              'text-accent-green'
            }`}>
              {strengthData.level}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getStrengthColor(strengthData.level)}`}
              style={{ width: `${getStrengthWidth(strengthData.score)}%` }}
            />
          </div>
        </div>

        {/* Suggestions */}
        {strengthData.suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Suggestions:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {strengthData.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-accent-orange mr-2">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Breach Check Result */}
        {password && (
          <div className="mt-4 p-4 rounded-lg border">
            <h4 className="text-sm font-medium mb-2">Breach Check:</h4>
            {isCheckingBreach ? (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-blue mr-2"></div>
                Checking for breaches...
              </div>
            ) : breachData ? (
              <div className={`text-sm flex items-center ${
                breachData.isBreached ? 'text-accent-red' : 'text-accent-green'
              }`}>
                {breachData.isBreached ? (
                  <>
                    <span className="mr-2">⚠️</span>
                    <span>Warning — found in {breachData.breachCount} breaches!</span>
                  </>
                ) : (
                  <>
                    <span className="mr-2">✅</span>
                    <span>Safe — not found in any breaches</span>
                  </>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordChecker;
