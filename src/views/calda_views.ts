import Calda from '../models/calda'

export default {
    render(calda: Calda) {
        return {
            id: calda.id,
           fazenda: calda.fazenda,
			coordenador: calda.coordenador,
			agronomo: calda.agronomo,
			cultivo: calda.cultivo,
			safra: calda.safra,
            combate: calda.combate,
			tipoproduto: calda.tipoproduto,
			nomeproduto: calda.nomeproduto
            
        }
    },

    renderMany(caldas: Calda[]) {
        return caldas.map(calda => this.render(calda))
    }
}

