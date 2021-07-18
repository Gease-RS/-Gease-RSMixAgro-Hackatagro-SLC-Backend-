import { Router, Request, Response } from 'express'
import { auth } from './middlewares/auth'
import multer from 'multer'
import uploadConfig from './config/upload'

import UsersController from './controllers/UsersControllers'
import CaldasController from './controllers/CaldasControllers'


const routes = Router()
const upload = multer(uploadConfig)

routes.get('/', (request: Request,  response: Response) => {
    return response.json({ message: 'BEM-VINDOS A XSYS'})
})

routes.post('/api/v1/register', UsersController.create)
routes.post('/api/v1/login', UsersController.login)
routes.get('/api/v1/users', UsersController.index)
routes.get('/api/v1/users/:id', UsersController.show)

routes.get('/api/v1/caldas',  CaldasController.index)
routes.get('/api/v1/caldas/:id', CaldasController.show)
routes.post('/api/v1/caldas', CaldasController.create)
routes.put('/api/v1/caldas/:id', CaldasController.update)

routes.use(auth)

export default routes