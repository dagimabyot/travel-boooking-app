import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("flybook.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    frequent_flyer_no TEXT,
    saved_payment_methods TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    flight_id TEXT,
    from_city TEXT,
    to_city TEXT,
    departure_time TEXT,
    arrival_time TEXT,
    airline TEXT,
    price REAL,
    status TEXT,
    seat TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // OAuth Routes
  app.get("/api/auth/:provider/url", (req, res) => {
    const { provider } = req.params;
    const redirectUri = `${req.protocol}://${req.get('host')}/auth/callback`;
    
    // Mocking the OAuth URL construction
    const authUrl = `https://${provider}.com/oauth/authorize?client_id=MOCK_ID&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile`;
    
    res.json({ url: authUrl });
  });

  app.get("/auth/callback", (req, res) => {
    // In a real app, we'd exchange the code for tokens and store the user
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    `);
  });

  // Auth Routes
  app.post("/api/auth/signup", (req, res) => {
    const { email, password, name } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
      const info = stmt.run(email, password, name);
      res.json({ id: info.lastInsertRowid, email, name });
    } catch (e) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Booking Routes
  app.get("/api/bookings/:userId", (req, res) => {
    const bookings = db.prepare("SELECT * FROM bookings WHERE user_id = ?").all(req.params.userId);
    res.json(bookings);
  });

  app.post("/api/bookings", (req, res) => {
    const { user_id, flight_id, from_city, to_city, departure_time, arrival_time, airline, price, seat } = req.body;
    const stmt = db.prepare(`
      INSERT INTO bookings (user_id, flight_id, from_city, to_city, departure_time, arrival_time, airline, price, status, seat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', ?)
    `);
    const info = stmt.run(user_id, flight_id, from_city, to_city, departure_time, arrival_time, airline, price, seat);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/bookings/:id", (req, res) => {
    db.prepare("DELETE FROM bookings WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Mock Packages Search
  app.get("/api/packages/search", (req, res) => {
    const packages = Array.from({ length: 20 }).map((_, i) => ({
      id: `PKG-${i}`,
      name: ["Palolem Beach", "Venice Beach", "Amalfi Coast", "Santorini Escape", "Bali Retreat"][i % 5],
      location: ["Italy, Manarola", "USA, California", "Italy, Amalfi", "Greece, Santorini", "Indonesia, Bali"][i % 5],
      price: 500 + i * 50,
      rating: 4.5 + (Math.random() * 0.5),
      image: `https://picsum.photos/seed/pkg${i}/800/600`,
      description: "A wonderful trip to the most beautiful places on earth. Enjoy the sun, the sea and the local culture.",
      included: ["Flight", "Hotel", "Transfer"],
      duration: "3 days 2 nights"
    }));
    res.json(packages);
  });

  // Mock Hotels Search
  app.get("/api/hotels/search", (req, res) => {
    const hotels = Array.from({ length: 20 }).map((_, i) => ({
      id: `HTL-${i}`,
      name: ["Water Hotel", "Beach Hotel", "Mountain Resort", "City Center Inn", "Luxury Palace"][i % 5],
      location: ["Italy, Manarola", "USA, California", "Switzerland, Alps", "UK, London", "UAE, Dubai"][i % 5],
      price: 150 + i * 20,
      rating: 4.0 + (Math.random() * 1.0),
      image: `https://picsum.photos/seed/htl${i}/800/600`,
      description: "Experience luxury and comfort in our premium hotel rooms. We offer the best amenities and services.",
      amenities: ["Free WiFi", "Pool", "Spa", "Gym"]
    }));
    res.json(hotels);
  });

  // Mock Flight Search (In a real app, this would call an external API)
  app.get("/api/flights/search", (req, res) => {
    const { from, to, date } = req.query;
    // Mock data generation
    const airlines = ["SkyHigh", "GlobalJet", "Oceanic", "StarFlyer"];
    const flights = Array.from({ length: 20 }).map((_, i) => {
      const depHour = (6 + i) % 24;
      const arrHour = (depHour + 2 + Math.floor(Math.random() * 5)) % 24;
      return {
        id: `FL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        from: from || "London",
        to: to || "New York",
        departure: `${date || "2024-06-15"}T${depHour.toString().padStart(2, '0')}:00:00`,
        arrival: `${date || "2024-06-15"}T${arrHour.toString().padStart(2, '0')}:00:00`,
        price: 299 + Math.floor(Math.random() * 500),
        duration: "7h 30m",
        class: "Economy"
      };
    });
    res.json(flights);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
