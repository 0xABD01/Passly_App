import React from 'react';

const PasswordStrengthBar = ({ strength, score }) => {
  const getStrengthColor = (level) => {
    switch (level) {
      case 'weak': return 'bg-accent-red';
      case 'medium': return 'bg-accent-orange';
      case 'strong': return 'bg-accent-green';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthWidth = (score) => {
    return Math.min(100, (score / 6) * 100);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Strength:</span>
        <span className={`text-sm font-semibold capitalize ${
          strength === 'weak' ? 'text-accent-red' :
          strength === 'medium' ? 'text-accent-orange' :
          'text-accent-green'
        }`}>
          {strength}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${getStrengthColor(strength)}`}
          style={{ width: `${getStrengthWidth(score)}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthBar;
