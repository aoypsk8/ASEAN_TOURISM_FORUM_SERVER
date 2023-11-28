import express ,{Router} from 'express'
import authController from '../controllers/authController'



const router: Router =express.Router()

//Register
router.post('/register',authController.register)

//Login
router.post('/login',authController.login)

export default router