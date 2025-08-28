# Insurance Agency Onboarding System

A comprehensive web application designed to streamline the insurance agent onboarding process. The system features a multi-step form interface that guides agents through personal information collection, document signing, license verification, and integration with various business systems.

## 🚀 Features

- **Multi-step Onboarding Process**: Guided workflow for agent registration
- **Document Management**: Digital signature collection for W-4, I-9, and employment agreements
- **License Verification**: Automated checking of insurance licenses across multiple states
- **Third-party Integrations**: 
  - GoHighLevel CRM integration
  - Google Workspace email setup
  - Payroll system integration
  - Google Sheets data export
- **Admin Dashboard**: Real-time monitoring of onboarding progress and analytics
- **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices

## 🛠 Technology Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Hook Form + Zod (form validation)
- Radix UI components

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- Nodemailer (email notifications)

## 📋 Prerequisites

Before deploying this application, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud-based like MongoDB Atlas)
- **Git** for version control

## ⚙️ Environment Setup

### Required Environment Variables

Create the following environment files:

**Frontend (`.env.local` in root directory):**
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000

# Third-party Services
NEXT_PUBLIC_GOHIGHLEVEL_API_KEY=your-ghl-api-key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

**Backend (`backend/.env`):**
```bash
# Server Configuration
PORT=5000
NODE_ENV=production
JWT_SECRET=your-jwt-secret-key

# Database
MONGODB_URI=mongodb://localhost:27017/hib-onboarding
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hib-onboarding

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password

# Google Services
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# External APIs
GOHIGHLEVEL_API_KEY=your-ghl-api-key
PAYROLL_API_URL=your-payroll-api-url
PAYROLL_API_KEY=your-payroll-api-key
```

## 🚀 Installation & Deployment

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hib-onboarding
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables:**
   - Create `.env.local` in the root directory with frontend variables
   - Create `backend/.env` with backend variables

5. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod

   # If using MongoDB Atlas, ensure your connection string is correct in backend/.env
   ```

6. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

7. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

8. **Access the application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

### Production Deployment

#### Option 1: Vercel + Railway/Heroku (Recommended)

**Frontend on Vercel:**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

**Backend on Railway:**
1. Connect your repository to Railway
2. Set up MongoDB (Railway provides PostgreSQL, you may need MongoDB Atlas)
3. Configure environment variables
4. Deploy backend service

#### Option 2: VPS/Cloud Server

**Using PM2 for production:**

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Build the frontend:**
   ```bash
   npm run build
   ```

3. **Start backend with PM2:**
   ```bash
   cd backend
   pm2 start npm --name "hib-backend" -- start
   ```

4. **Start frontend with PM2:**
   ```bash
   pm2 start npm --name "hib-frontend" -- start
   ```

5. **Set up reverse proxy (Nginx):**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

#### Option 3: Docker Deployment

1. **Create `Dockerfile` in root:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Create `docker-compose.yml`:**
   ```yaml
   version: '3.8'
   services:
     frontend:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NEXT_PUBLIC_API_URL=http://backend:5000/api
     
     backend:
       build: ./backend
       ports:
         - "5000:5000"
       environment:
         - MONGODB_URI=mongodb://mongo:27017/hib-onboarding
     
     mongo:
       image: mongo:latest
       ports:
         - "27017:27017"
   ```

3. **Deploy:**
   ```bash
   docker-compose up -d
   ```

## 🔧 Configuration

### Database Setup

The application will automatically create the necessary collections in MongoDB. Ensure your MongoDB instance is running and accessible.

### Third-party Services Setup

1. **GoHighLevel**: Obtain API key from your GoHighLevel account
2. **Google Services**: Set up Google Cloud Console project and obtain OAuth credentials
3. **Email Service**: Configure SMTP settings (Gmail, SendGrid, etc.)

## 📱 Usage

1. **Agent Registration**: Agents access the application and begin the onboarding process
2. **Step-by-step Workflow**: Guided through personal information, document signing, and verification
3. **Admin Monitoring**: Administrators can track progress through the dashboard
4. **Automated Notifications**: System sends updates to uplines and administrators

## 🐛 Troubleshooting

**Common Issues:**

1. **"Cannot connect to database"**
   - Verify MongoDB is running
   - Check MONGODB_URI in environment variables
   - Ensure network connectivity

2. **"API endpoints not found"**
   - Confirm backend server is running on correct port
   - Verify NEXT_PUBLIC_API_URL points to backend

3. **"Build fails"**
   - Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
   - Ensure all environment variables are set

4. **"Third-party integrations failing"**
   - Verify API keys are correct and active
   - Check service-specific documentation for setup requirements

## 📞 Support

For deployment issues or questions, check:
- Environment variables are correctly configured
- All services are running
- Database connectivity is established
- API keys are valid and have proper permissions

## 🔄 Updates

To update the application:
1. Pull latest changes: `git pull origin main`
2. Install new dependencies: `npm install && cd backend && npm install`
3. Restart services: `pm2 restart all` (if using PM2)

---

**Note**: This application handles sensitive personal and financial information. Ensure proper security measures are in place including HTTPS, secure environment variable storage, and regular security updates.
