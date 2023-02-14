import express from 'express'
import { authUser,registerUser, getuserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authmiddleware.js'
const router = express.Router()

//@desc Fetch all products

//
router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getuserProfile)


export default router