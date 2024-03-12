import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecipeEntry } from './recipeEntry.entity';
import { RecipeFile } from './recipeFile.entity';

@Entity() 
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 70, nullable: false })
  name: string;

  @OneToMany(() => RecipeEntry, (recipeEntry) => recipeEntry.recipe, {
    cascade: true
  })
  entries: RecipeEntry[];

  @OneToMany(() => RecipeFile, (file) => file.owner)
  files: RecipeFile[];
}