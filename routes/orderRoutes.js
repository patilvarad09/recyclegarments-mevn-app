import express from 'express'
import { createOrder,getSingleOrder, getCurrentUserOrders, updateOrder } from '../controllers/orderController.js'
import { protect } from '../middleware/authmiddleware.js'
const router = express.Router()

//@desc Fetch all products

//
router.route('/').post(protect, createOrder); 
router.route('/showAllMyOrders').get(protect, getCurrentUserOrders);
router.route('/:id').patch(updateOrder);
router.route('/:id').get(protect, getSingleOrder)

export default router