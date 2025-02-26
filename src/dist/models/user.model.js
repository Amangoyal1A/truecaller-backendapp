"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initModel(sequelize) {
        try {
            User.init({
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
                    unique: true,
                },
                email: {
                    type: sequelize_1.DataTypes.STRING,
                },
                password: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
            }, {
                sequelize,
                modelName: "user",
                freezeTableName: true,
                tableName: "user",
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at",
            });
        }
        catch (error) {
            console.error("Error initializing model [USER]:", {
                err: error,
            });
            throw error;
        }
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map