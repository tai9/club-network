import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class InitNotificationSchema1702958300391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notifications",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "isRead",
            type: "boolean",
            default: false,
          },
          {
            name: "type",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "createdBy",
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
      "notifications",
      new TableForeignKey({
        columnNames: ["createdBy"],
        referencedColumnNames: ["id"],
        referencedTableName: "members",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notifications");
  }
}
