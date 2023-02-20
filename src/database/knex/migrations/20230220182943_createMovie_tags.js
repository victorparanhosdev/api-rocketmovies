exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.integer("note_id").unsigned().references("id").inTable("notas").onDelete("CASCADE");
    table.integer("user_id").unsigned().references("id").inTable("users");

    table.text("name").notNullable();

});


exports.down = knex => knex.schema.dropTable("tags");
