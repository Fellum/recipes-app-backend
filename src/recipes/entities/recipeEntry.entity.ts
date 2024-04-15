import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Measure } from 'src/measures/entities/measure.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Recipe } from './recipe.entity';

@Entity() 
export class RecipeEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.entries)
  recipe: Recipe;

  @ManyToOne(() => Measure)
  measure: Measure;

  @ManyToOne(() => Ingredient)
  ingredient: Ingredient;

  @Column('decimal', { precision: 6, scale: 4 })
  amount: number;
}