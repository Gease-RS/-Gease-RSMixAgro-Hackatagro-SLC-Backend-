import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import User from '../models/User'
import userView from '../views/users_views'
import * as  bcrypt from 'bcrypt'
import * as Yup from 'yup'
import * as jwt from 'jsonwebtoken' 


export default {
    async index(request: Request, response: Response) {
        const users = await getRepository(User).find()

      	return response.json(users)
	},		
    async show(request: Request, response: Response) {
        const { id } = request.params

    const usersRepository = getRepository(User)

    const user = await usersRepository.findOneOrFail(id)

    return response.json(userView.render(user))
    },
    async update(request: Request, response: Response) {
        const { id } = request.params
		const user= await getRepository(User)
			.findOneOrFail(request.params.id, {
                relations: ['profile']
            })
		if(user){
			getRepository(User).merge(user,request.body)
			const result = getRepository(User).save(user)
		}else{response.json({msg: 'Cliente não encontrado'})}
		return response.json(userView.render(user))
	},
    async create(request: Request, response: Response) {
        const userRepository = getRepository(User)

		const {
            username,
            firstname,
            lastname,
            email,
            password
        } = request.body

        const existUser = await userRepository.findOne({username})

        if(existUser) {
            return response.status(400).json({message: 'Este username já foi criado. Tente outro!'})
        }

        const existEmail = await userRepository.findOne({email})

        if(existEmail) {
            return response.status(400).json({message: 'Email já utilizado. Faça o login!'})
        }
        
        const passwordHash = await bcrypt.hash(password, 8)
        
		const data = {
			username,
            firstname,
            lastname,
            email,
            password: passwordHash
		} 

		const schema = Yup.object().shape({
            username: Yup.string().required(),
            firstname: Yup.string().required(),
            lastname: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required()
		})

		schema.validate(data, { 
			abortEarly: false
		})

		const user = await getRepository(User).create(data)
		const result = await getRepository(User).save(user)
		response.json(result).status(201)
    },
    async login(request: Request, response: Response) {
        const { email, password } = request.body

        const user = await  getRepository(User).find({
            where: {
                email
            }
        })

        if  (user.length === 1) {
            if (await bcrypt.compare(password, user[0].password)) {
                const token = jwt.sign({id: user[0].id}, process.env.APP_SECRET, {
                    expiresIn: '1d'
                })

                const data = {  
                    id:  user[0].id,
                    username: user[0].username,
                    email: user[0].email,
                    token
                }

                return response.json(data)
            
            } else {
                return response.status(404).json({ message: 'Usuário ou Senha Incorretos!'})
            }  
            
        } else {
                return response.status(404).json({ message: 'Usuário Não Encontrado'})
        }
    }

}