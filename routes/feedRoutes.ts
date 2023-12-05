import express ,{Router} from 'express'
import feedController from '../controllers/feedController'
import { authenticateToken, authenticateTokenAdmin } from '../middleware/authMiddleware';


const router: Router =express.Router()


//GetAl;
router.get('/',feedController.getAllFeeds)

//GetById;
router.get('/:feedId',feedController.getByFeedId)

//Create
router.post('/createFeed',authenticateTokenAdmin,feedController.createFeed)

//Update
router.put('/:feedId',authenticateTokenAdmin,feedController.updateFeed)

//Delete
router.delete('/:feedId',authenticateTokenAdmin,feedController.deleteFeed)



export default router