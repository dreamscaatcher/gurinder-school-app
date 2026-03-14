import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamptz', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate: Date;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
