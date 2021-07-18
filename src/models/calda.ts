import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from "typeorm"

@Entity('caldas')
export default class Calda  {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    fazenda: string;

    @Column()
    coordenador: string;

    @Column()
    agronomo: string;

    @Column()
    cultivo: string;
    
    @Column()
    safra: string;

    @Column()
    combate: string;

    @Column()
    tipoproduto: string;

    @Column()
    nomeproduto: string;

}