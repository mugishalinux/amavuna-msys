import { Certificate } from "../../certificates/entity/certificate.entity";
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
import { User } from "../../user/user/entity/user.entity";

@Entity("christian")
export class Christian extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  lastName: string;
  @Column()
  firstName: string;
  @Column({ nullable: true })
  dob: Date;
  @Column()
  primaryPhone: string;
  @Column({ default: false })
  isBaptised: boolean;
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
  @OneToOne(() => Certificate, (certificate) => certificate.victim) // specify inverse side as a second parameter
  certificate: Certificate;
  @ManyToOne(() => User, (user) => user.christian)
  user: User;
}
