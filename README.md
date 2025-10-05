# Passly - Smart Password Manager

🔐 **Smart. Secure. Simple.**

Passly is a modern web application that helps users create, check, and protect passwords. It includes a password strength checker, a breach detector, and a smart password generator with full UI polish.

## ✨ Features

### 🔍 Password Strength & Breach Checker
- Live strength meter (Weak / Medium / Strong) with color bar
- Real-time suggestions for improving password strength
- Integration with Have I Been Pwned API for breach detection
- Visual feedback with color-coded strength indicators

### 🎲 Smart Password Generator
- **Fully Random Mode**: Generate completely random passwords with customizable options
- **Base Word Mode**: Strengthen existing words by replacing characters and adding complexity
- **Custom Symbols Mode**: Use your favorite symbols in password generation
- Copy-to-clipboard functionality for all generated passwords

### 🔒 Password Security Features
- **Breach Detection**: Real-time checking against known data breaches
- **No Storage**: Passwords are never stored locally for maximum security
- **Client-Side Only**: All processing happens in your browser

### 🎨 Modern UI/UX
- Clean, responsive design built with React + Tailwind CSS
- Dark/Light mode toggle with system preference detection
- Smooth animations and transitions
- Mobile-friendly interface

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd passly-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS with custom color scheme
- **Build Tool**: Vite for fast development and building
- **API**: Have I Been Pwned API for breach detection

## 📁 Project Structure

```
src/
├── components/
│   ├── PasswordChecker.jsx      # Password strength and breach checking
│   ├── PasswordGenerator.jsx    # Smart password generation
│   ├── PasswordStrengthBar.jsx  # Reusable strength indicator
│   └── ThemeToggle.jsx          # Dark/light mode toggle
├── utils/
│   ├── strengthUtils.js         # Password strength calculation
│   ├── hashUtils.js            # API integration for breach checking
│   └── generatorUtils.js       # Password generation algorithms
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
└── index.css                   # Global styles and Tailwind imports
```

## 🎯 Usage Examples

### Password Strength Checking
1. Navigate to the "Password Checker" tab
2. Enter any password to see its strength rating
3. View suggestions for improvement
4. Check if the password has been breached

### Password Generation
1. Go to the "Password Generator" tab
2. Choose from three generation modes:
   - **Random**: Set length and character types
   - **Base Word**: Enter a word to strengthen (e.g., "football" → "F00tB@ll!92")
   - **Custom Symbols**: Use your favorite symbols
3. Click "Generate Password" and copy to clipboard

## 🔒 Security Features

- **No Storage**: Passwords are never stored locally for maximum security
- **Breach Detection**: Real-time checking against known data breaches
- **Client-Side Only**: All processing happens in your browser
- **Privacy First**: Your passwords never leave your device

## 🎨 Customization

### Colors
The app uses a custom color scheme defined in `tailwind.config.js`:
- Primary Blue: `#3B82F6`
- Dark Mode: `#111827`
- Light Mode: `#F9FAFB`
- Accent Colors: Green (`#22C55E`), Orange (`#F59E0B`), Red (`#EF4444`)

### Themes
- Automatic dark/light mode detection
- Manual toggle available in the header
- Theme preference saved in localStorage

## 📱 Responsive Design

Passly is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Features
1. Create new components in `src/components/`
2. Add utility functions in `src/utils/`
3. Update the main App component to include new features
4. Follow the existing code structure and naming conventions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Have I Been Pwned](https://haveibeenpwned.com/) for the breach detection API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the component-based UI library

---

**Made with ❤️ for password security**
