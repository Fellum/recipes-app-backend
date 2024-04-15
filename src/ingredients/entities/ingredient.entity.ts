import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, BaseEntity, ChildEntity } from 'typeorm';
import { IngredientFile } from './ingredientFile.entity';

@Entity() 
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 70, nullable: false })
  name: string;

  @Column('decimal', { precision: 6, scale: 4 })
  calories: number;

  @Column('decimal', { precision: 6, scale: 4 })
  proteins: number;

  @Column('decimal', { precision: 6, scale: 4 })
  fats: number;

  @Column('decimal', { precision: 6, scale: 4 })
  carbohydrates: number;

  @OneToMany(() => IngredientFile, (file) => file.owner)
  files: IngredientFile[];
}