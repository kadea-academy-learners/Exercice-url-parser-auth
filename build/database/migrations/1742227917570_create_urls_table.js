import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'urls';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('full_url');
            table.string('short_url');
            table.text('qr_code');
            table.timestamp('created_at');
            table.timestamp('updated_at');
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1742227917570_create_urls_table.js.map