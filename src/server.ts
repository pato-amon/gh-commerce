import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Ghana Commerce API is running"
    });
});

app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})