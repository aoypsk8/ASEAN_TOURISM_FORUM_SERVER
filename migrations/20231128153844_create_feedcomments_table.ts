import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("feedcomments", function (table) {
        table.increments("feedcommentid").primary();
        table.string("feedid").notNullable();
        table.string("userid").notNullable();
        table.string("commenttext").notNullable();
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("feedcomments");
}

