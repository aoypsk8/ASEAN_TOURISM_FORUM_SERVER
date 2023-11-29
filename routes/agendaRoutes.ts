import express ,{Router} from 'express'
import agendaController from '../controllers/agendaController'


const router: Router =express.Router()

//GetAl;
router.get('/',agendaController.getAllAgenda)

//GetById;
router.get('/:agendaId',agendaController.getByAgendaId)

//Create
router.post('/createAgenda',agendaController.createAgenda)

//Update
router.put('/:agendaId',agendaController.updateAgenda)

//Delete
router.delete('/:agendaId',agendaController.deleteAgenda)

export default router