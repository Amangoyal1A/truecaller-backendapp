"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const sequelize_1 = require("sequelize");
class Contact extends sequelize_1.Model {
    static initModel(sequelize) {
        try {
            Contact.init({
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                phoneNumber: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                userId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
            }, {
                sequelize,
                modelName: "contact",
                freezeTableName: true,
                tableName: "contact",
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at",
            });
        }
        catch (error) {
            console.error("Error initializing model [Contact]:", {
                err: error,
            });
            throw error;
        }
    }
}
exports.Contact = Contact;
//# sourceMappingURL=contact.model.js.map