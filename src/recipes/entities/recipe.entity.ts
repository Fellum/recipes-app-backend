import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecipeEntry } from './recipeEntry.entity';
import { RecipeFile } from './recipeFile.entity';

@Entity() 
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 70, nullable: false })
  name: string;

  @Column({type: 'json'})
  requiredTools: any;

  @Column({type: 'json'})
  steps: any;

  @Column()
  cookingTime: number;

  @Column()
  servingsCount: number;

  @Column('decimal', { precision: 6, scale: 4, nullable: true })
  calories: number;

  @Column('decimal', { precision: 6, scale: 4, nullable: true })
  proteins: number;

  @Column('decimal', { precision: 6, scale: 4, nullable: true })
  fats: number;

  @Column('decimal', { precision: 6, scale: 4, nullable: true })
  carbohydrates: number;

  @OneToMany(() => RecipeEntry, (recipeEntry) => recipeEntry.recipe, {
    cascade: true
  })
  entries: RecipeEntry[];

  @OneToMany(() => RecipeFile, (file) => file.owner)
  files: RecipeFile[];
}