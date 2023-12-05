import express ,{Router} from 'express'
import agendaController from '../controllers/agendaController'
import { authenticateToken, authenticateTokenAdmin } from '../middleware/authMiddleware';


const router: Router =express.Router()



//GetAl;
router.get('/',agendaController.getAllAgenda)

//GetById;
router.get('/:agendaId',agendaController.getByAgendaId)

//Create
router.post('/createAgenda',authenticateTokenAdmin,agendaController.createAgenda)

//Update
router.put('/:agendaId',authenticateTokenAdmin,agendaController.updateAgenda)

//Delete
router.delete('/:agendaId',authenticateTokenAdmin,agendaController.deleteAgenda)

export default router