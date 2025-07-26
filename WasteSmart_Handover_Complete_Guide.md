# WasteSmart Project Handover Guide

## Complete Implementation Guide for QR Code Development

---

## Project Overview

WasteSmart is a React Native mobile application designed for smart waste management. The app currently has a complete user interface with authentication, user profiles, recycling history tracking, and a map showing recycling stations. However, the QR code scanning functionality is not yet implemented - this is where you come in.

Your task is to implement the QR code scanning feature that will work with a Jetson Nano device to detect plastic types and weights, then store this data in the Firebase database.

---

## Firebase Project Information

### Project Details

- **Project Name**: WasteSmart
- **Project ID**: wasteapp-a4af0
- **Database Type**: Firestore (NoSQL database)
- **Authentication Method**: Email and password

### Access Credentials

The project includes a service account key file (`serviceAccountKey.json`) that contains all the necessary credentials for accessing the Firebase project. This file is already in the project root directory.

**Important**: You'll need to get the actual Firebase API keys from the project owner to set up your local environment. The current configuration uses environment variables for security.

### Environment Setup Required

You need to create a `.env` file in the project root with these variables:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
EXPO_PUBLIC_FIREBASE_PROJECT_ID=wasteapp-a4af0
EXPO_PUBLIC_FIREBASE_APP_ID=your_actual_app_id_here
```

**Note**: Replace "your_actual_api_key_here" and "your_actual_app_id_here" with the real values from the Firebase console.

---

## Database Structure Explanation

The Firebase database is organized into collections (similar to tables in a traditional database). Here's what each collection stores:

### Users Collection

This stores information about each user who registers with the app:

- **fullName**: The user's full name
- **age**: User's age as a number
- **email**: User's email address
- **phone**: User's phone number
- **residence**: User's address or location
- **profileImage**: URL to the user's profile picture
- **pledgeRecycle**: Boolean indicating if user pledged to recycle
- **totalRecycled**: Total amount of plastic recycled in kilograms
- **createdAt**: When the user account was created

### History Collection

This stores each recycling transaction:

- **userId**: Links the transaction to a specific user
- **date**: Date of recycling in YYYY-MM-DD format
- **kgs**: Weight of recycled material in kilograms
- **amount**: Payment amount in dollars
- **location**: Where the recycling took place

**New fields you need to add for QR implementation:**

- **plasticType**: Type of plastic (PET, HDPE, PVC, LDPE, PP, PS, Other)
- **weight**: Weight in grams from Jetson Nano sensors
- **qrCodeData**: Raw data from the QR code
- **binId**: Which specific bin was used
- **timestamp**: Exact time of the recycling transaction

### Bins Collection

This stores information about recycling bins:

- **name**: Name of the bin
- **location**: GPS coordinates (latitude and longitude)
- **busyness**: How busy the bin is (Low, Moderate, High)
- **waitingTime**: Average waiting time in minutes
- **capacity**: How full the bin is (percentage)
- **address**: Physical address of the bin

### News Collection

This stores news articles about recycling:

- **title**: Article headline
- **text**: Article content
- **image**: URL to article image
- **bgColor**: Background color for the article card

---

## Getting Started with the Repository

### Step 1: Clone the Repository

Open your terminal or command prompt and run these commands:

```bash
git clone https://github.com/Swansong101/Waste.git
cd Waste
```

### Step 2: Switch to the Development Branch

**This is extremely important!** You must work on the development branch, not the main branch:

```bash
git checkout dev
git pull origin dev
```

### Step 3: Install Project Dependencies

Install all the required packages:

```bash
npm install
```

### Step 4: Set Up Your Environment

1. Make sure the `serviceAccountKey.json` file is in your project root
2. Create a new file called `.env` in the project root
3. Add the Firebase credentials to the `.env` file (get these from the project owner)
4. The `.env` file should look like this:

```
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyYourActualApiKeyHere
EXPO_PUBLIC_FIREBASE_PROJECT_ID=wasteapp-a4af0
EXPO_PUBLIC_FIREBASE_APP_ID=1:734418026832:web:YourActualAppIdHere
```

### Step 5: Start the Development Server

```bash
npx expo start
```

This will start the development server and show you options to run the app on your phone, emulator, or web browser.

---

## Current State of the QR Scanner

The QR scanner page currently exists at `app/scanner.js` but it's completely empty - it just shows "Scanner" text. You need to implement the entire QR code scanning functionality from scratch.

### What You Need to Implement

1. **Camera Integration**: Set up the camera to scan QR codes
2. **QR Code Processing**: Read and parse QR code data
3. **Jetson Nano Integration**: Connect with the Jetson Nano device to get weight data
4. **Database Updates**: Save the scanned data to Firebase
5. **User Interface**: Create a user-friendly scanning interface
6. **Error Handling**: Handle invalid QR codes and connection issues

---

## QR Code Implementation Requirements

### QR Code Format

The QR codes should contain data in this format:

```
plasticType|weight|timestamp
```

For example:

```
PET|150|2024-01-15T10:30:00Z
```

### Plastic Types to Support

- **PET**: Polyethylene terephthalate (water bottles, food containers)
- **HDPE**: High-density polyethylene (milk jugs, detergent bottles)
- **PVC**: Polyvinyl chloride (pipes, packaging)
- **LDPE**: Low-density polyethylene (plastic bags, squeeze bottles)
- **PP**: Polypropylene (yogurt containers, bottle caps)
- **PS**: Polystyrene (foam cups, food containers)
- **Other**: Any other plastic type

### Jetson Nano Integration

The Jetson Nano device should:

1. Detect when plastic is placed on the scale
2. Measure the weight in grams
3. Generate a QR code with the plastic type and weight data
4. Display the QR code for the mobile app to scan

### Mobile App Requirements

The mobile app should:

1. Request camera permissions
2. Scan the QR code displayed by Jetson Nano
3. Parse the plastic type and weight data
4. Show the user what was scanned
5. Save the data to Firebase with the current user's ID
6. Update the user's total recycled amount
7. Show a success message

---

## Development Workflow

### Creating Your Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/qr-scanner-implementation
```

### Making Changes

1. Implement your QR code functionality
2. Test thoroughly on your device
3. Test the integration with Jetson Nano
4. Make sure all data is saved correctly to Firebase

### Saving Your Work

```bash
git add .
git commit -m "Implement QR code scanning functionality"
git push origin feature/qr-scanner-implementation
```

### Creating a Pull Request

1. Go to the GitHub repository
2. Click "Compare & pull request" for your branch
3. Set the target branch to `dev` (not main!)
4. Write a description of what you implemented
5. Request a review from the project owner

### Important Rules

- **Never push directly to main branch**
- **Always work on dev branch or feature branches**
- **Test everything thoroughly before creating a pull request**
- **Only merge to main after final approval and testing**

---

## Technical Implementation Details

### Required Packages

You'll likely need to install these packages:

```bash
npm install expo-camera
npm install expo-barcode-scanner
npm install @react-native-async-storage/async-storage
```

### Camera Permissions

The app needs permission to access the camera. This is handled in the `app.json` file, but you may need to add:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow WasteSmart to access your camera to scan QR codes."
        }
      ]
    ]
  }
}
```

### Firebase Integration

The Firebase connection is already set up in `lib/firebase.js`. You'll use the `db` export to save data:

```javascript
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

// Example of saving scanned data
const saveScannedData = async (plasticType, weight, userId) => {
  try {
    await addDoc(collection(db, "history"), {
      userId: userId,
      plasticType: plasticType,
      weight: weight,
      date: new Date().toISOString().split("T")[0],
      timestamp: new Date(),
      // Add other required fields
    });
  } catch (error) {
    console.error("Error saving data:", error);
  }
};
```

### User Authentication

The app already has user authentication set up. You can get the current user's ID like this:

```javascript
import { useAuth } from "../lib/AuthProvider";

const { user } = useAuth();
const userId = user.uid;
```

---

## Testing Your Implementation

### Local Testing

1. Run the app on your phone or emulator
2. Test QR code scanning with sample QR codes
3. Verify data is saved to Firebase
4. Check that user totals are updated correctly

### Jetson Nano Testing

1. Connect your Jetson Nano device
2. Test the weight sensor functionality
3. Generate QR codes with different plastic types
4. Scan the QR codes with your mobile app
5. Verify the data matches what was generated

### Database Verification

1. Check the Firebase console to see if data is being saved
2. Verify the data format is correct
3. Test with different users to ensure data is linked correctly

---

## Common Issues and Solutions

### Camera Not Working

- Check if camera permissions are granted
- Make sure you're testing on a physical device (camera doesn't work in web)
- Verify the expo-camera package is installed correctly

### QR Code Not Scanning

- Ensure the QR code is well-lit and in focus
- Check that the QR code format matches the expected format
- Test with different QR code sizes

### Firebase Connection Issues

- Verify your `.env` file has the correct credentials
- Check that the Firebase project is active
- Ensure you have internet connection

### Data Not Saving

- Check the Firebase console for error messages
- Verify the user is authenticated
- Make sure all required fields are provided

---

## Final Steps Before Handover

### Code Review Checklist

- [ ] QR code scanning works correctly
- [ ] Data is saved to Firebase properly
- [ ] User totals are updated
- [ ] Error handling is implemented
- [ ] UI is user-friendly
- [ ] Jetson Nano integration works
- [ ] All tests pass

### Documentation

- Update this document with any changes you make
- Document any new database fields you add
- Note any special requirements for Jetson Nano setup

### Deployment

1. Create a pull request to the `dev` branch
2. Get approval from the project owner
3. After approval, the code will be merged to `dev`
4. Only after final testing will `dev` be merged to `main`

---

## Support and Communication

### Getting Help

- Contact the project owner for Firebase credentials
- Use the GitHub issues page for technical problems
- Document any issues you encounter

### Keeping Updated

- Regularly pull the latest changes from the `dev` branch
- Stay in communication with the project owner
- Update the team on your progress

---

## Summary

You're implementing the QR code scanning functionality for the WasteSmart app. This involves:

1. **Setting up the development environment** with the correct branch and dependencies
2. **Implementing camera-based QR scanning** in the mobile app
3. **Integrating with Jetson Nano** for weight and plastic type detection
4. **Saving data to Firebase** with proper user authentication
5. **Following proper development workflow** with feature branches and pull requests

The key is to work on the `dev` branch, test thoroughly, and communicate with the project owner throughout the process. The existing app structure provides a solid foundation - you just need to add the QR scanning functionality to complete the smart waste management system.

Good luck with the implementation!
