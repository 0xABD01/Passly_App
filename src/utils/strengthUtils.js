// Password strength calculation utilities
export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, level: 'weak', suggestions: [] };
  
  let score = 0;
  const suggestions = [];
  
  // Length check
  if (password.length >= 8) score += 1;
  else suggestions.push('Use at least 8 characters');
  
  if (password.length >= 12) score += 1;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  else suggestions.push('Add lowercase letters');
  
  if (/[A-Z]/.test(password)) score += 1;
  else suggestions.push('Add uppercase letters');
  
  if (/[0-9]/.test(password)) score += 1;
  else suggestions.push('Add numbers');
  
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else suggestions.push('Add special characters');
  
  // Common patterns penalty
  if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters
  if (/123|abc|qwe/i.test(password)) score -= 1; // Sequential patterns
  
  // Determine strength level
  let level;
  if (score <= 2) level = 'weak';
  else if (score <= 4) level = 'medium';
  else level = 'strong';
  
  return { score: Math.max(0, score), level, suggestions };
};

export const getStrengthColor = (level) => {
  switch (level) {
    case 'weak': return 'bg-accent-red';
    case 'medium': return 'bg-accent-orange';
    case 'strong': return 'bg-accent-green';
    default: return 'bg-gray-300';
  }
};

export const getStrengthWidth = (score) => {
  return Math.min(100, (score / 6) * 100);
};
