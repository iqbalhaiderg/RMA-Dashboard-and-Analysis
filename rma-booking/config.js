// ====== RMA BOOKING SYSTEM CONFIG ======
// 1) Paste your Firebase project config here (SETUP.md step 2)
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAspULbDxz-0_VAvB-G58LmknIY_SHvwi8",
  authDomain: "rma-booking.firebaseapp.com",
  projectId: "rma-booking",
  storageBucket: "rma-booking.firebasestorage.app",
  messagingSenderId: "283860989886",
  appId: "1:283860989886:web:8b7a865498e64a7d3c6bef"
};

// 2) Optional: Apps Script webhook URL for syncing confirmed bookings to your Google Sheet (SETUP.md step 6)
const SHEET_WEBHOOK = "";

// Venue settings
const VENUE = {
  name: "Royal Multisport Arena",
  phone: "01886-542122",
  bkash: "01886-542122", // bKash number clients send the advance to
  advance: 500,           // advance (BDT) required to confirm a booking
  bookAheadDays: 14,      // how far ahead clients can book
};

// Slot schedule. Weekend in Bangladesh = Friday & Saturday.
const SLOTS = [
  { t: "06:30", label: "6:30 AM – 8:00 AM",  eve: false, bonus: true },
  { t: "08:00", label: "8:00 AM – 9:30 AM",  eve: false },
  { t: "09:30", label: "9:30 AM – 11:00 AM", eve: false },
  { t: "11:00", label: "11:00 AM – 12:30 PM",eve: false },
  { t: "12:30", label: "12:30 PM – 2:00 PM", eve: false },
  { t: "14:00", label: "2:00 PM – 3:30 PM",  eve: false },
  { t: "15:30", label: "3:30 PM – 5:00 PM",  eve: false },
  { t: "17:00", label: "5:00 PM – 6:30 PM",  eve: true  },
  { t: "18:30", label: "6:30 PM – 8:00 PM",  eve: true  },
  { t: "20:00", label: "8:00 PM – 9:30 PM",  eve: true  },
  { t: "21:30", label: "9:30 PM – 11:00 PM", eve: true  },
  { t: "23:00", label: "11:00 PM – 12:30 AM",eve: true  },
];

// Price card (BDT): [weekday day, weekday evening, weekend day, weekend evening]
const PRICES = { wdDay: 2500, wdEve: 4500, weDay: 3000, weEve: 5000 };

function slotPrice(dateStr, slotT) {
  const d = new Date(dateStr + "T00:00:00");
  const we = d.getDay() === 5 || d.getDay() === 6; // Fri, Sat
  const s = SLOTS.find(x => x.t === slotT);
  const eve = s ? s.eve : false;
  return we ? (eve ? PRICES.weEve : PRICES.weDay) : (eve ? PRICES.wdEve : PRICES.wdDay);
}

// Payment methods & default expense/income heads (seeded from your Elements sheet)
const PAY_METHODS = ["Cash", "Bkash", "Nogod", "Bank"];
const DEFAULT_HEADS = {
  income:  ["I - Slot Fee Income", "I - Other Income"],
  expense: ["Lease Fee","Employee Basic Salary","Employee Bonus","Electricity Bill","Generator Expenses",
            "Repair & Maintenance","Cleaning Bill","Marketing Expense","Internet Bill","Mobile Bill Expense",
            "Office Equipments","Supplies Purchase","Night Guards","Printing and Packaging","Transport Expense",
            "Admin Expenses","Other Expenses"]
};
