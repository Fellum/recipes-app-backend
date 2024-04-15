import { File } from 'src/files/entities/file.entity';
import { Column, ManyToOne, ChildEntity } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@ChildEntity()
export class IngredientFile extends File {
  @Column({name: 'purpose'})
  purpose: string;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.files, {cascade: true})
  owner: Ingredient;
}
