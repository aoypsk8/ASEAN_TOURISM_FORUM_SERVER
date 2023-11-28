import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("checkin", function (table) {
        table.increments("checkinid").primary();
        table.string("userid").notNullable();
        table.time("checkin_time").notNullable();
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("checkin");
}

