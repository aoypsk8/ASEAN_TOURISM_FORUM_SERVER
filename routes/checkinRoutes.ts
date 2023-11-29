import express ,{Router} from 'express'
import checkinController from '../controllers/checkinController'


const router: Router =express.Router()

//GetAl;
router.get('/',checkinController.getAllCheckin)

//GetById;
router.get('/:checkinId',checkinController.getByCheckinId)

//Create
router.post('/createCheckin',checkinController.createCheckin)

//Update
router.put('/:checkinId',checkinController.updateCheckin)

//Delete
router.delete('/:checkinId',checkinController.deleteCheckin)

export default router