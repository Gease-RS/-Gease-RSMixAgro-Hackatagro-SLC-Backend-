import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    OneToMany,
    JoinColumn,
    Index,
    OneToOne
} from "typeorm"

@Entity('users')
@Unique(["username", "email" ])
export default class User  {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()  
    @Column({ unique: true }) 
    username: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
    
    @Index()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}