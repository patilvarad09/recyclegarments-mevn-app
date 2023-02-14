import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({})
    res.json(products)
})

const getProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id) 
    if(product){
        res.json(product)
    }else {
       res.status(404)
       throw new Error('Product not found')
    }
    
})
// const getProductByName = (req,res) => {
//     const searchedField = req.query.name;
//     Product.find({name: {$regex:req.params.name}}) 
//     if(product){
//         res.json(product)
//     }else {
//        res.status(404)
//        throw new Error('Product not found')
//     }
    
// }
const getProductByName = asyncHandler(async(req,res) => {
    const product = await Product.find({name: {$regex:req.query.name, $options: '$i'}}) 
    if(product){
        res.json(product)
    }else {
       res.status(404)
       throw new Error('Product not found')
    }
    
})

export {
    getProducts,
    getProductById,
    getProductByName 
}