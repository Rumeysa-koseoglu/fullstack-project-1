//server.js
//application's "entry point" starts the server, loads global middleware and mounts routes
import express from "express"; // Express framework
import helmet from "helmet"; // adds security headers
import morgan from "morgan"; // to log HTTP  request
import cors from "cors"; // for CORS settings
import dotenv from "dotenv"; // reads the .env file
import productRoutes from "./routes/productRoutes.js"; // get product routes (default export)

dotenv.config(); //puts the contents of the .env into the process.env

const app = express();
const PORT = process.env.PORT || 3000; // if there is no PORT in .env, use 3000

//--------Global Middlewares----------
//those are works before all the routes work (order is important)
app.use(express.json()); // converts incoming JSON body to req.body
app.use(cors()); //cross-origin permissions
app.use(helmet()); //helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); //log the requests in detail to the console

//----------Rotue mount-----------
//all routes in productRouters will be used with the base path "/api/products"
//so while its 'router.get("/")' in the router, it will actually be GET /api/products
app.use("/api/products", productRoutes);

//----------Start the server----------
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
