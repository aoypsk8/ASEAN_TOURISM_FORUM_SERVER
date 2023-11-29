import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("checkin", function (table) {
        table.increments("checkinid").primary();
        table.string("userid").notNullable();
        table.string("description",1000).notNullable();
        table.time("start_time").notNullable();
        table.time("end_time").notNullable();
        table.string("location").notNullable();
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("checkin");
}

