import express ,{Router} from 'express'
import scheduleController from '../controllers/scheduleController'
import { authenticateToken, authenticateTokenAdmin } from '../middleware/authMiddleware';

const router: Router =express.Router()




//GetAl;
router.get('/',scheduleController.getAllSchedule)

//GetById;
router.get('/:scheduleId',scheduleController.getByScheduleId)

//Create
router.post('/createSchedule',authenticateTokenAdmin,scheduleController.createSchedule)

//Update
router.put('/:scheduleId',authenticateTokenAdmin,scheduleController.updateSchedule)

// //Delete
router.delete('/:scheduleId',authenticateTokenAdmin,scheduleController.deleteSchedule)

export default router