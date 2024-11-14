import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json()) // allows to accept json data in the body
app.use("/api/products", productRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}


app.listen(PORT, ()=> {
    connectDB();
    console.log("The app is listening on port http://localhost:"+PORT)
})
