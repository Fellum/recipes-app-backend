import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity()
@TableInheritance({column: {name: 'type', type: 'varchar'}})
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    encoding: string;

    @Column()
    mimetype: string;

    @Column()
    filename: string;

    @Column()
    size: number;

    @Column()
    internalPath: string;

    type: string;
}
