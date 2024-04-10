import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTask1712780909268 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // queryRunner.query(`
        // CREATE TABLE public.task(
        //     id integer NOT NULL,
        //     user_id integer NOT NULL,
        //     title_task character varying NOT NULL,
        //     description character varying NOT NULL,
        //     concluded BOOLEAN NOT NULL,
        //     date_conclusion DATE,
        //     priority NUMERIC NOT NULL,
        //     created_at timestamp without time zone DEFAULT now() NOT NULL,
        //     updated_at timestamp without time zone DEFAULT now() NOT NULL,
        //     CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES author(id),
        //     primary key (id)
        // );

        // CREATE SEQUENCE public.task_id_seq
        //     AS integer
        //     START WITH 1
        //     INCREMENT BY 1
        //     NO MINVALUE
        //     NO MAXVALUE
        //     CACHE 1;

        // ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;

        // ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);

        // ALTER TABLE public.task add foreign key (user_id) references public.user (id);
        // `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        drop table public.task;
        `)
    }

}
