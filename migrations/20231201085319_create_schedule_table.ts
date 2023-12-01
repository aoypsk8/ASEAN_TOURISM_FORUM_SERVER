import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("schedule", function (table) {
    table.increments("scheduleid").primary();
    table.string("title").notNullable();
    table.string("location").notNullable();
    table.string("start_time").notNullable();
    table.string("end_time").notNullable();
    table.string("description").nullable();

    // Adding foreign key constraint
    table.integer("agendaid").notNullable().unsigned();
    table.foreign("agendaid").references("agendas.agendaid"); // Adjust the reference based on your actual schema
    
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("schedule");
}
