import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Measure } from 'src/measures/entities/measure.entity';
import { Ingridient } from 'src/ingridients/entities/ingridient.entity';
import { Recipe } from './recipe.entity';

@Entity() 
export class RecipeEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.entries)
  recipe: Recipe;

  @ManyToOne(() => Measure)
  measure: Measure;

  @ManyToOne(() => Ingridient)
  ingridient: Ingridient;

  @Column('decimal', { precision: 6, scale: 4 })
  amount: number;
}