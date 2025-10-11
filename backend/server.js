//server.js
//application's "entry point" starts the server, loads global middleware and mounts routes
import express from "express"; // Express framework
import helmet from "helmet"; // adds security headers
import morgan from "morgan"; // to log HTTP  request
import cors from "cors"; // for CORS settings
import dotenv from "dotenv"; // reads the .env file
import productRoutes from "./routes/productRoutes.js"; // get product routes (default export)
import { sql } from "../config/db.js";
import { aj } from "./lib/arcjet.js";

//load environment variables first (PORT DB credentials ARCJET_KEY etc.)
dotenv.config(); //puts the contents of the .env into the process.env
//Keep .env out of version control. Add `.env` to .gitignore.

const app = express();
const PORT = process.env.PORT || 3000; // if there is no PORT in .env, use 3000

//--------Global Middlewares----------
//those are works before all the routes work (order is important)
app.use(express.json()); // converts incoming JSON body to req.body
app.use(cors()); //cross-origin permissions
app.use(helmet()); //helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); //log the requests in detail to the console

// apply arcjet rate-limit to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, //sepecifies that each request consumes one token
    });

    //if arcjet decides to deny the request, return appropriate HTTP status
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    //check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed bot detected" });
    }

    //if not denied, continue to the next middleware / route
    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});

//----------Rotue mount-----------
//all routes in productRouters will be used with the base path "/api/products"
//so while its 'router.get("/")' in the router, it will actually be GET /api/products
app.use("/api/products", productRoutes);

async function initDB() {
  //this function runs an SQL command, in other words
  //every time the application runs, it checks whether the products table exist in PostgreSQL
  //if there is no table named 'products', creates automatically
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

    console.log("Database initialized successfully"); // if success prints a log "database initialized successfully"
  } catch (error) {
    console.log("Error initDB", error);
  }
}

//----------Start the server----------
//the logic here is: first prepare the database, then start the server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
