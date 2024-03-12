import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class Measure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 70, nullable: false })
  name: string;

  @Column('decimal', { precision: 6, scale: 4 })
  ratio: number;
}