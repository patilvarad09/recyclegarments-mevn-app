import connectDB from "./db.js"
import dotenv from 'dotenv'
import cors from 'cors'
import express  from 'express'
import path from 'path';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
connectDB
const app = express()
app.use(express.json())
app.use(cors());
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(express.static(path.join(__dirname, './client/dist')));

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
})

app.use(notFound)
app.use(errorHandler)

app.get('/', (req,res)=>{
    res.send('Hello Homepage');
})




const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
