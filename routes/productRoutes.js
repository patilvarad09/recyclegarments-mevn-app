import express from 'express'
import { getProducts, getProductById, getProductByName} from '../controllers/productController.js'
const router = express.Router()

//@desc Fetch all products

//

router.route('/').get(getProducts) 
router.route('/:id').get(getProductById) 
router.route('/').get(getProductByName)



export default router