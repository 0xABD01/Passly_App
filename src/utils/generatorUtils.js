// Password generation utilities
export const generateRandomPassword = (options = {}) => {
  const {
    length = 12,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true
  } = options;
  
  let charset = '';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (!charset) {
    throw new Error('At least one character type must be enabled');
  }
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return password;
};

export const strengthenBaseWord = (baseWord) => {
  if (!baseWord) return '';
  
  // Character replacement map
  const replacements = {
    'a': '@', 'A': '@',
    'e': '3', 'E': '3',
    'i': '1', 'I': '1',
    'o': '0', 'O': '0',
    's': '$', 'S': '$',
    't': '7', 'T': '7',
    'l': '1', 'L': '1'
  };
  
  let strengthened = baseWord;
  
  // Apply character replacements
  for (const [original, replacement] of Object.entries(replacements)) {
    strengthened = strengthened.replace(new RegExp(original, 'g'), replacement);
  }
  
  // Add random numbers and symbols
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  // Add 1-2 random numbers
  const numCount = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < numCount; i++) {
    const randomNum = numbers.charAt(Math.floor(Math.random() * numbers.length));
    const randomPos = Math.floor(Math.random() * (strengthened.length + 1));
    strengthened = strengthened.slice(0, randomPos) + randomNum + strengthened.slice(randomPos);
  }
  
  // Add 1-2 random symbols
  const symCount = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < symCount; i++) {
    const randomSym = symbols.charAt(Math.floor(Math.random() * symbols.length));
    const randomPos = Math.floor(Math.random() * (strengthened.length + 1));
    strengthened = strengthened.slice(0, randomPos) + randomSym + strengthened.slice(randomPos);
  }
  
  // Ensure at least one uppercase letter
  if (!/[A-Z]/.test(strengthened)) {
    const randomPos = Math.floor(Math.random() * strengthened.length);
    strengthened = strengthened.slice(0, randomPos) + strengthened[randomPos].toUpperCase() + strengthened.slice(randomPos + 1);
  }
  
  return strengthened;
};

export const generateWithCustomSymbols = (baseWord, customSymbols) => {
  if (!baseWord || !customSymbols) return '';
  
  let password = baseWord;
  
  // Replace some characters with custom symbols
  const symbolArray = customSymbols.split('');
  const vowels = 'aeiouAEIOU';
  
  for (let i = 0; i < password.length && i < symbolArray.length; i++) {
    if (vowels.includes(password[i])) {
      const randomSymbol = symbolArray[Math.floor(Math.random() * symbolArray.length)];
      password = password.replace(password[i], randomSymbol);
    }
  }
  
  // Add random numbers
  const numbers = '0123456789';
  const numCount = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < numCount; i++) {
    const randomNum = numbers.charAt(Math.floor(Math.random() * numbers.length));
    const randomPos = Math.floor(Math.random() * (password.length + 1));
    password = password.slice(0, randomPos) + randomNum + password.slice(randomPos);
  }
  
  // Ensure mixed case
  if (!/[A-Z]/.test(password)) {
    const randomPos = Math.floor(Math.random() * password.length);
    password = password.slice(0, randomPos) + password[randomPos].toUpperCase() + password.slice(randomPos + 1);
  }
  
  return password;
};

export const shuffleString = (str) => {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
};
