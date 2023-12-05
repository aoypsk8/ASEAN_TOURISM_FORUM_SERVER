import express ,{Router} from 'express'
import userController from '../controllers/userController'
import { authenticateToken, authenticateTokenAdmin } from '../middleware/authMiddleware';


const router: Router =express.Router()



//GetById;
router.get('/:userId',userController.getUserById)

//Update user;
router.put('/:userId',authenticateToken,userController.updateUser)

export default router