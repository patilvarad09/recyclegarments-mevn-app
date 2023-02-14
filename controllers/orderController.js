import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes';
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js';


const fakeStripeAPI = async ({amount,currency})=>{
    const client_secret = 'someRandomValue'
    return {client_secret,amount}
}

const createOrder = asyncHandler(async(req,res) => {
    const {items: cartItems, tax, shippingFee, shippingAddress} = req.body;
    if(!cartItems || cartItems.length < 1) {
        res.status(400)
        throw new Error('No order Items')
    }
    if (!tax || !shippingFee) {
        res.status(400)
        throw new Error('Please provide tax and shipping fee')
    }  
    if (!shippingAddress) {
        res.status(400)
        throw new Error('Please provide shipping Address')
    }
    let orderItems = [];
    let subtotal = 0;
    for(const item of cartItems) {
        const dbProduct = await Product.findOne({_id:item.product});
        if(!dbProduct) {
            res.status(400)
            throw new Error('No product with this Id')
        }
        const {name,price,image,_id} = dbProduct;
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            product: _id,
        };

        orderItems = [...orderItems,singleOrderItem];
        subtotal += item.amount * price;
    }
    const total = tax + shippingFee + subtotal;
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd',
    });
    const order = await Order.create({
        
        orderItems,
        total,
        subtotal,
        tax,
        shippingFee,
        shippingAddress,
        clientSecret: paymentIntent.client_secret,
        user: req.user._id,
    });
    res.status(StatusCodes.CREATED).json({order, clientSecret:order.client_secret})
});

const getSingleOrder = asyncHandler(async(req,res)=>{
    const {id:orderId} = req.params;
    const order = await Order.findOne({_id:orderId})
    res.status(StatusCodes.OK).json({order});
});

const getCurrentUserOrders = asyncHandler(async(req,res)=>{
   const orders = await Order.find({user: req.user._id});
   res.status(StatusCodes.OK).json({orders, count:orders.length})
 
});

const updateOrder = asyncHandler(async(req,res)=>{
    const {id: orderId} = req.params;
    // const {paymentIntentId} = req.body;

    const order = await Order.findOne({_id: orderId});
    if (!order) {
        throw new Error('No Order with this id')
    }
    // order.paymentIntentId = paymentIntentId
    order.status = 'canceled';
    await order.save()
    res.status(StatusCodes.OK).json({order})
});



export {createOrder,getSingleOrder, getCurrentUserOrders,updateOrder};