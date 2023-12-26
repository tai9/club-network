import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNotificationPost1703601523345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "posts",
      new TableColumn({
        name: "isNotification",
        type: "boolean",
        default: false,
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("posts", "isNotification");
  }
}
