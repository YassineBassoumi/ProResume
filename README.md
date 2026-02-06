 ProResume - AI-Powered Resume Builder

![ProResume Logo](client/public/logo.svg)

ProResume is a modern, AI-powered resume builder that helps you create professional resumes in minutes. With multiple template options, AI writing assistance, and job-tailoring features, landing your dream job has never been easier.

## ✨ Features

- **🎨 9 Professional Templates** - Choose from templates designed for different industries (Corporate, Creative, Tech, Academic, Entry-Level)
- **🤖 AI Writing Assistant** - Get AI-powered suggestions for summaries, bullet points, and skill recommendations
- **🎯 Job Tailoring** - Automatically optimize your resume for specific job descriptions with match score analysis
- **📱 Real-time Preview** - See your changes instantly with live preview and zoom controls
- **💾 Auto-save** - Never lose your work with automatic saving
- **🌙 Dark Mode** - Eye-friendly interface with light/dark theme support
- **📄 PDF Export** - Download professional PDF resumes ready for submission
- **🔐 Secure Authentication** - Support for email/password and OAuth (Google, LinkedIn)
- **📊 Resume Management** - Create, edit, and manage multiple resumes from your dashboard

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/proresume.git
cd proresume
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Set up environment variables**

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email Service (for verification)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# OAuth - Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5001/api/auth/google/callback

# OAuth - LinkedIn
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:5001/api/auth/linkedin/callback

# Frontend URL
CLIENT_URL=http://localhost:5173

# AI Service (Gemini)
GEMINI_API_KEY=your_gemini_api_key
```

5. **Start the development servers**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

## 📁 Project Structure

```
ProResume/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── resume/   # Resume-specific components
│   │   │   │   └── templates/  # Resume templates
│   │   │   └── ui/       # UI components (shadcn)
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Entry point
│
└── README.md
```

## 🎯 Available Templates

1. **Modern Professional** - Clean and contemporary design (Corporate)
2. **Classic Executive** - Traditional sidebar layout (Corporate)
3. **Creative Teal** - Two-column creative design (Creative)
4. **Tech Stack** - Modern tech-focused design (Tech)
5. **Terminal Style** - Terminal-inspired minimalist (Tech)
6. **Academic CV** - Traditional CV format (Academic)
7. **Medical Professional** - Healthcare CV format (Academic/Medical)
8. **Student Fresh** - Perfect for students (Entry-Level)
9. **Entry Level** - Ideal for first-time job seekers (Entry-Level)

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **ReactQuill** - Rich text editor
- **html2pdf.js** - PDF generation
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Passport.js** - Authentication
- **JWT** - Token-based auth
- **Google Gemini AI** - AI features
- **Nodemailer** - Email service

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/linkedin` - LinkedIn OAuth

### Resume Endpoints
- `GET /api/resumes` - Get all user resumes
- `GET /api/resumes/:id` - Get single resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### AI Endpoints
- `POST /api/ai/generate-summary` - Generate resume summary
- `POST /api/ai/improve-description` - Improve job description
- `POST /api/ai/generate-bullets` - Generate bullet points
- `POST /api/ai/suggest-skills` - Suggest relevant skills
- `POST /api/ai/optimize-ats` - Optimize for ATS
- `POST /api/ai/tailor-to-job` - Tailor resume to job description

## 🔑 Key Features Explained

### AI Writing Assistant
The AI writing assistant uses Google's Gemini API to help users:
- Generate professional summaries based on job title and experience
- Improve job descriptions with action verbs and quantifiable achievements
- Create compelling bullet points
- Suggest relevant skills
- Optimize content for ATS (Applicant Tracking Systems)

### Job Tailoring
Upload your resume and a job description to get:
- Match score analysis
- Missing keywords identification
- Optimization suggestions
- One-click resume updates

### Auto-save
Resumes are automatically saved every 3 seconds while editing, ensuring no work is lost.

## 🎨 Customization

### Adding New Templates
1. Create a new template component in templates
2. Follow the existing template structure
3. Register the template in ResumePreview.jsx
4. Add template metadata to Templates.jsx

### Styling
The project uses Tailwind CSS with custom theme configuration in tailwind.config.cjs. Modify the theme to customize colors, fonts, and spacing.

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Email verification
- Password reset functionality
- Protected routes
- Input validation and sanitization
- CORS configuration
- Secure cookie handling

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting platform

### Backend (Railway/Render/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [Google Gemini](https://ai.google.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## 📧 Support

For support, email your.email@example.com or open an issue on GitHub.

---

**Made with ❤️ by [Yassine Bassoumi]**
