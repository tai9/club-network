import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCheckoutUrlColumn1709801660231 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "tickets",
      new TableColumn({
        name: "checkoutUrl",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("tickets", "checkoutUrl");
  }
}
