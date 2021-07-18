import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Calda from '../models/calda'
import * as Yup from 'yup'

import caldaView from '../views/calda_views'

export default {
    async index(request: Request, response: Response) {
	const caldas = await getRepository(Calda).find()

	return response.json(caldas)
	},		
	async show(request: Request, response: Response) {
        const { id } = request.params
        
        const caldasRepository = getRepository(Calda)
        
        const calda = await caldasRepository.findOneOrFail(id)
        
        return response.json(caldaView.render(calda))
    },

	async update(request: Request, response: Response) {
		const calda = await getRepository(Calda)
			.findOneOrFail(request.params.id)
		if(calda){
			getRepository(Calda).merge(calda,request.body)
			const result = getRepository(Calda).save(calda)
		}else{response.json({msg: 'Cliente não encontrado'})}
		return response.json(calda)
		
	},
	
	async create(request: Request, response: Response) {
		const caldaRepository = getRepository(Calda)

		const {	
			fazenda,
			coordenador,
			agronomo,
			cultivo,
			safra,
			combate,
			tipoproduto,
			nomeproduto

		} = request.body

		const data = {
			fazenda,
			coordenador,
			agronomo,
			cultivo,
			safra,
			combate,
			tipoproduto,
			nomeproduto
		} 

		const schema = Yup.object().shape({
			fazenda: Yup.string().required(),
			coordenador: Yup.string().required(),
			agronomo: Yup.string().required(),
			cultivo: Yup.string().required(),
			safra: Yup.string().required(),
			combate: Yup.string().required(),
			tipoproduto: Yup.string().required(),
			nomeproduto: Yup.string().required()
			
		})

		schema.validate(data, { 
			abortEarly: false
		})

		const calda = await getRepository(Calda).create(data)
		const result = await getRepository(Calda).save(calda)
		response.json(result).status(201)
	}

}

