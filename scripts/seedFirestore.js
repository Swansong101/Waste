// scripts/seedFirestore.js
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Initialize Firebase Admin
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

async function seed() {
  // Seed bins
  const bins = [
    {
      name: "Part X Smart Bin",
      location: { latitude: -1.3182, longitude: 36.8152 },
      busyness: "Moderate",
      waitingTime: 6,
      capacity: 64,
      address: "Strathmore University, Maraka Estate, Nairobi",
    },
    {
      name: "Library Smart Bin",
      location: { latitude: -1.3185, longitude: 36.8148 },
      busyness: "Low",
      waitingTime: 2,
      capacity: 30,
      address: "Strathmore University Library",
    },
    {
      name: "Cafeteria Smart Bin",
      location: { latitude: -1.3178, longitude: 36.8156 },
      busyness: "High",
      waitingTime: 10,
      capacity: 85,
      address: "Strathmore University Cafeteria",
    },
  ];
  for (const bin of bins) {
    await db.collection("bins").add(bin);
  }

  // Seed news
  const news = [
    {
      title: "Country X Bans Plastic Bags",
      text: "Country X has announced a nationwide ban on single-use plastic bags, set to take effect next month. Shoppers are encouraged to switch to reusable bags as part of the green initiative.",
      image: "", // You can add a hosted image URL if available
      bgColor: "#E1F7E4",
    },
    {
      title: "Types of Plastics",
      text: "Learn the seven common resin codes, how to recognise them, and which plastics are easiest to recycle.",
      image: "",
      bgColor: "#F5E6F4",
    },
    {
      title: "Plastic Wastes since 2010",
      text: "A decade-long view of global plastic production versus recycling rates — where do we stand today?",
      image: "",
      bgColor: "#FFF9D9",
    },
  ];
  for (const article of news) {
    await db.collection("news").add(article);
  }

  // Optionally seed history for a test user (replace USER_ID with a real user id)
  /*
  const history = [
    { date: '2025-03-20', kgs: '0.5', amount: '$50', location: 'Location A', userId: 'USER_ID' },
    { date: '2025-03-02', kgs: '0.8', amount: '$40', location: 'Location B', userId: 'USER_ID' },
  ];
  for (const entry of history) {
    await db.collection('history').add(entry);
  }
  */

  console.log("Firestore seeded successfully!");
}

seed().catch(console.error);
