import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, BaseEntity, ChildEntity } from 'typeorm';
import { IngridientFile } from './ingridientFile.entity';

@Entity() 
export class Ingridient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 70, nullable: false })
  name: string;

  @Column('decimal', { precision: 6, scale: 4 })
  callories: number;

  @Column('decimal', { precision: 6, scale: 4 })
  proteins: number;

  @Column('decimal', { precision: 6, scale: 4 })
  fats: number;

  @Column('decimal', { precision: 6, scale: 4 })
  carbohydrates: number;

  @OneToMany(() => IngridientFile, (file) => file.owner)
  files: IngridientFile[];
}