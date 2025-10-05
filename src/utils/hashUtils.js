import CryptoJS from 'crypto-js';

// Hash utilities for password security
export const hashPassword = (password) => {
  return CryptoJS.SHA1(password).toString().toUpperCase();
};

export const checkPasswordBreach = async (password) => {
  try {
    const hash = hashPassword(password);
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);
    
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const data = await response.text();
    
    const lines = data.split('\n');
    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix === suffix) {
        return {
          isBreached: true,
          breachCount: parseInt(count, 10)
        };
      }
    }
    
    return {
      isBreached: false,
      breachCount: 0
    };
  } catch (error) {
    console.error('Error checking password breach:', error);
    return {
      isBreached: false,
      breachCount: 0,
      error: 'Unable to check breach status'
    };
  }
};
