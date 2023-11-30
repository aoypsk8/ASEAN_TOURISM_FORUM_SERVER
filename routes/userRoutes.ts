import express ,{Router} from 'express'
import userController from '../controllers/userController'



const router: Router =express.Router()

//GetById;
router.get('/:userId',userController.getUserById)

//Update user;
router.put('/:userId',userController.updateUser)

export default router