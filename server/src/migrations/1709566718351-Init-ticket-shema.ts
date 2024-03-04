import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class InitTicketShema1709566718351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tickets",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "image",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "tokenId",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "supply",
            type: "int",
            default: 0,
          },
          {
            name: "quantity",
            type: "int",
            default: 0,
          },
          {
            name: "defaultPrice",
            type: "int",
            default: 0,
          },
          {
            name: "createdBy",
            type: "int",
            isNullable: false,
          },
          {
            name: "owner",
            type: "int",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "('now'::text)::timestamp(6) with time zone",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "('now'::text)::timestamp(6) with time zone",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "tickets",
      new TableForeignKey({
        columnNames: ["createdBy"],
        referencedColumnNames: ["id"],
        referencedTableName: "members",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "tickets",
      new TableForeignKey({
        columnNames: ["owner"],
        referencedColumnNames: ["id"],
        referencedTableName: "members",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tickets");
  }
}
