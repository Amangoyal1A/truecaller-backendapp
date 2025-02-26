"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spam = void 0;
const sequelize_1 = require("sequelize");
class Spam extends sequelize_1.Model {
    static initModel(sequelize) {
        try {
            Spam.init({
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                phoneNumber: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                spamCount: {
                    type: sequelize_1.DataTypes.INTEGER,
                    defaultValue: 1,
                },
            }, {
                sequelize,
                modelName: "spam",
                freezeTableName: true,
                tableName: "spam",
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at",
            });
        }
        catch (error) {
            console.error("Error initializing model [SPAM]:", {
                err: error,
            });
            throw error;
        }
    }
}
exports.Spam = Spam;
//# sourceMappingURL=spam.model.js.map