import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTypeColumnToTickets1709883357619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "tickets",
      new TableColumn({
        name: "type",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("tickets", "type");
  }
}
