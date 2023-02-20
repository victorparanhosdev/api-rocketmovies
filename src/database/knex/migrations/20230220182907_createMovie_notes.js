exports.up = knex => knex.schema.createTable("notas", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("rating");
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete('CASCADE');
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

});


exports.down = knex => knex.schema.dropTable("notas");
