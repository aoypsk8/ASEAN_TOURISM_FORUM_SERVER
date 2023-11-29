import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("roles", function (table) {
        table.increments("roleid").primary();
        table.string("roelname").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("roles");
}

