import express from "express"
import apiRoute from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 5000;

// middleware (parses JSON)
app.use(express.json());
app.use(express.urlencoded())

app.use("/api", apiRoute)

// start server
app.listen(PORT, () => {
  console.log(`✅ Server running my on http://localhost:${PORT}`);
});
