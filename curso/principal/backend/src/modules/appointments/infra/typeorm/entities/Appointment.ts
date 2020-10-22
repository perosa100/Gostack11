import User from '@modules/users/infra/typeorm/entities/User'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider_id: string

  @ManyToOne(() => User) // um usuario para muiitos agendamendos ao contrario
  @JoinColumn({ name: 'provider_id' }) // qual coluna identica o id isso para acesar tudo
  provider: User

  @Column()
  user_id: string

  @ManyToOne(() => User) // um usuario para muiitos agendamendos ao contrario
  @JoinColumn({ name: 'user_id' }) // qual coluna identica o id isso para acesar tudo
  user: User

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Appointment