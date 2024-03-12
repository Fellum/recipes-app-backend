import { File } from 'src/files/entities/file.entity';
import { Column, ManyToOne, ChildEntity } from 'typeorm';
import { Ingridient } from './ingridient.entity';

@ChildEntity()
export class IngridientFile extends File {
  @Column({name: 'purpose'})
  purpose: string;

  @ManyToOne(() => Ingridient, (ingridient) => ingridient.files, {cascade: true})
  owner: Ingridient;
}
