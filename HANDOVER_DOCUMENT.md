# 🚀 WasteSmart Project Handover Document

## 📋 Project Overview

WasteSmart is a React Native mobile app for smart waste management with Firebase backend. You'll be implementing QR code functionality using Jetson Nano.

---

## 🔑 Firebase Credentials & Configuration

### Project Details

- **Project ID**: `wasteapp-a4af0`
- **Project Name**: WasteSmart
- **Database**: Firestore (NoSQL)
- **Authentication**: Email/Password

### Service Account Key

File: `serviceAccountKey.json` (included in project)

- **Client Email**: `firebase-adminsdk-fbsvc@wasteapp-a4af0.iam.gserviceaccount.com`
- **Project ID**: `wasteapp-a4af0`

### Environment Variables Needed

Create `.env` file in root directory:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_PROJECT_ID=wasteapp-a4af0
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

---

## 🗄️ Database Structure

### Collections & Fields

#### `users` Collection

- `fullName` (string)
- `age` (number)
- `email` (string)
- `phone` (string)
- `residence` (string)
- `profileImage` (string - URL)
- `pledgeRecycle` (boolean)
- `totalRecycled` (number - kg)
- `createdAt` (timestamp)

#### `history` Collection

- `userId` (string - references user)
- `date` (string - YYYY-MM-DD)
- `kgs` (string - weight in kg)
- `amount` (string - "$XX")
- `location` (string)
- `plasticType` (string) - **FOR QR IMPLEMENTATION**
- `timestamp` (timestamp) - **FOR QR IMPLEMENTATION**

#### `bins` Collection

- `name` (string)
- `location` (object: latitude, longitude)
- `busyness` (string: "Low", "Moderate", "High")
- `waitingTime` (number - minutes)
- `capacity` (number - percentage)
- `address` (string)

#### `news` Collection

- `title` (string)
- `text` (string)
- `image` (string - URL)
- `bgColor` (string - hex)

---

## 🔄 Repository Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Swansong101/Waste.git
cd Waste
```

### 2. Switch to Dev Branch (IMPORTANT!)

```bash
git checkout dev
git pull origin dev
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup Environment

- Copy `serviceAccountKey.json` to your local project
- Create `.env` file with Firebase credentials
- Get Firebase credentials from project owner

### 5. Start Development

```bash
npx expo start
```

---

## 🎯 QR Code Implementation Tasks

### Current State

- Scanner page exists but is empty (`app/scanner.js`)
- No QR code functionality implemented
- No plastic type detection

### Required Implementation

1. **QR Code Scanning**: Implement camera-based QR scanning
2. **Plastic Type Detection**: QR codes should contain plastic type info
3. **Weight Integration**: Connect with Jetson Nano weight sensors
4. **Database Updates**: Add plastic type and weight to history collection
5. **User Authentication**: Ensure scanned data links to authenticated user

### Database Fields for QR Implementation

Add to `history` collection:

- `plasticType` (string): "PET", "HDPE", "PVC", "LDPE", "PP", "PS", "Other"
- `weight` (number): weight in grams from Jetson Nano
- `qrCodeData` (string): raw QR code content
- `binId` (string): which bin was used

---

## 🚨 Important Development Rules

### Branch Management

- **NEVER push directly to `main`**
- **ALWAYS work on `dev` branch or feature branches**
- Create feature branch: `git checkout -b feature/qr-implementation`
- Push to dev: `git push origin feature/qr-implementation`
- Create Pull Request to merge into `dev`

### Code Review Process

1. Complete your QR implementation
2. Test thoroughly on Jetson Nano
3. Create Pull Request to `dev` branch
4. Request review from project owner
5. After approval, merge to `dev`
6. Only merge `dev` to `main` after final testing

---

## 🔧 Technical Requirements

### Jetson Nano Integration

- QR code should contain: `plasticType|weight|timestamp`
- Weight data from Jetson Nano sensors
- Real-time database updates
- Error handling for invalid QR codes

### Mobile App Integration

- Camera permissions for QR scanning
- Real-time weight display
- User feedback for successful scans
- Offline capability for later sync

### Security Considerations

- Validate QR code format
- Sanitize input data
- Rate limiting for scans
- User authentication verification

---

## 📞 Support & Communication

### Contact Information

- **Project Owner**: [Your Name]
- **Repository**: https://github.com/Swansong101/Waste
- **Branch**: Always use `dev` for development

### Documentation

- Update this document as you implement features
- Document any new database fields
- Keep track of Jetson Nano integration details

---

## ✅ Checklist Before Handover

- [ ] Repository cloned from `dev` branch
- [ ] Firebase credentials configured
- [ ] Environment variables set
- [ ] Dependencies installed
- [ ] App runs successfully
- [ ] Database structure understood
- [ ] QR implementation plan ready
- [ ] Jetson Nano integration planned

---

**Remember**: Always work on `dev` branch, never `main`. Test thoroughly before merging to `dev`, and only merge `dev` to `main` after final approval.
