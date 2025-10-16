# 🔐 Auth System - Modern Login & Registration System

A sleek, responsive authentication portal with dark/light theme support, built with Flask backend and vanilla JavaScript frontend.

![Auth System](https://img.shields.io/badge/Status-Ready%20to%20Deploy-green)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Flask](https://img.shields.io/badge/Flask-2.0%2B-lightgrey)

## ✨ Features

### 🎨 User Experience
- 🌓 **Dark/Light Mode Toggle** - Automatic system theme detection
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎯 **Modern UI/UX** - Clean, intuitive interface with smooth transitions
- 🌍 **International Phone Input** - Country flags and dial codes

### 🔐 Authentication
- 👤 **User Registration** - Full name, email, phone, and secure password
- 🔑 **User Login** - Login with email or phone number
- 🛡️ **Password Security** - BCrypt hashing for maximum security
- 📧 **Email Validation** - Real-time email format checking
- 🔒 **Password Strength** - Minimum 8 characters with visual feedback

### ⚡ Technical Features
- 🚀 **Flask Backend** - Lightweight and efficient Python server
- 🔄 **RESTful API** - Clean JSON endpoints for registration/login
- 💾 **JSON Database** - Simple file-based user storage
- 🎨 **Pure CSS** - No external CSS frameworks
- ⚡ **Vanilla JavaScript** - No jQuery or heavy libraries

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saad2134/auth-system.git
   cd auth-system
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server**
   ```bash
   python app.py
   ```
   Server runs on `http://localhost:5000`

4. **Open the frontend**
   - Open `index.html` in your browser
   - Or use a local server: `python -m http.server 8000`

## 🛠️ API Endpoints

### `POST /register`
Register a new user account.

**Request:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User registered successfully."
}
```

### `POST /login`
Authenticate an existing user.

**Request:**
```json
{
  "identifier": "john@example.com",  // or phone number
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Login successful."
}
```

## 🎨 Customization

### Colors & Themes
Modify CSS variables in `styles.css`:
```css
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --button-bg: #6600ff;
  --form-bg: #f9f9f9;
}
```

### Adding New Fields
1. Update HTML form in `index.html`
2. Add validation in `scripts.js`
3. Modify Flask routes in `app.py`

## 🌐 Deployment

### Backend (Flask)
- **Production Server**: Use Gunicorn or uWSGI
- **Platforms**: Heroku, DigitalOcean, AWS, PythonAnywhere

### Frontend
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Remember**: Update `API_URL` in `scripts.js` for production

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure Flask server is running on port 5000
   - Check browser console for specific errors

2. **Phone Input Not Loading**
   - Verify `assets/` folder exists with intl-tel-input library
   - Check network tab for failed resource loads

3. **Registration Fails**
   - Check if all required fields are filled
   - Verify email and phone aren't already registered

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests or open issues for bugs and feature requests.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments

- [intl-tel-input](https://github.com/jackocnr/intl-tel-input) for phone number formatting
- [Flask](https://flask.palletsprojects.com/) for the lightweight backend
- [BCrypt](https://github.com/pyca/bcrypt/) for password security

---

**⭐ Star this repo if you found it helpful!**
