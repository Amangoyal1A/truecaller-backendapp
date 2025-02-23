import { DataTypes, Model, Sequelize } from "sequelize";
import { IUserModelAttributes } from "./interface";

export class User extends Model<IUserModelAttributes> {
    public static initModel(sequelize: Sequelize) {
        try {
            User.init(
                {
                    id: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                    name: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    phoneNumber: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                    },
                    email: {
                        type: DataTypes.STRING,
                    },
                    password: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                },
                {
                    sequelize,
                    modelName: "user",
                    freezeTableName: true,
                    tableName: "user",
                    timestamps: true,
                    createdAt: "created_at",
                    updatedAt: "updated_at",
                }
            );
        } catch (error) {
            console.error("Error initializing model [USER]:", {
                err: error,
            });
            throw error;
        }
    }
}