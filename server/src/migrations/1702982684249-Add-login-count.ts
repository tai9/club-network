import { Member } from "@/entities";
import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AddLoginCount1702982684249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "members",
      new TableColumn({
        name: "loginCount",
        type: "int",
        default: 0,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("members", "loginCount");
  }
}
