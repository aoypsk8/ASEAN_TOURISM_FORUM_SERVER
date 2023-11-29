import express ,{Router} from 'express'
import feedController from '../controllers/feedController'



const router: Router =express.Router()

//GetAl;
router.get('/',feedController.getAllFeeds)

//GetById;
router.get('/:feedId',feedController.getByFeedId)

//Create
router.post('/createFeed',feedController.createFeed)

//Update
router.put('/:feedId',feedController.updateFeed)

//Delete
router.delete('/:feedId',feedController.deleteFeed)

export default router