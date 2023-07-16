import { Christian } from "../../christian/entity/christian.entity";
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

@Entity("certificate")
export class Certificate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Christian)
  @JoinColumn()
  victim: Christian;

  @Column()
  isAllowed: boolean;
  @Column()
  status: number;
  @Column({ nullable: true })
  created_by: number;
  @Column()
  updated_by: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
