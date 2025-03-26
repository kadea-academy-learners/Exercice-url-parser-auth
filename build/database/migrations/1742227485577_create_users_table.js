import { BaseSchema } from '@adonisjs/lucid/schema';
import { RoleValue } from '../../app/Enumes/RoleEnum.js';
export default class extends BaseSchema {
    tableName = 'users';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable();
            table.string('username').nullable();
            table.string('email', 254).notNullable().unique();
            table.string('password').notNullable();
            table.enum('role', Object.values(RoleValue)).defaultTo(RoleValue.USER);
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1742227485577_create_users_table.js.map