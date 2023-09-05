import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Christian } from "../christian/entity/christian.entity";

@Entity("attendence")
export class Attendence extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  attendenceDate: Date;
  @Column()
  status: string;
  @ManyToOne(() => Christian, (christian) => christian.attendence)
  christian: Christian;
}
