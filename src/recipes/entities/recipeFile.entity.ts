import { File } from 'src/files/entities/file.entity';
import { Column, ManyToOne, ChildEntity } from 'typeorm';
import { Recipe } from './recipe.entity';

@ChildEntity()
export class RecipeFile extends File {
  @Column({name: 'purpose'})
  purpose: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.files, {cascade: true})
  owner: Recipe;
}
