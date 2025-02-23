import { DataTypes, Model, Sequelize } from "sequelize";
import { IContactModelAttributes } from "./interface";

export class Contact extends Model<IContactModelAttributes> {
    public static initModel(sequelize: Sequelize) {
        try {
            Contact.init(
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
                    },
                    userId: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                },
                {
                    sequelize,
                    modelName: "contact",
                    freezeTableName: true,
                    tableName: "contact",
                    timestamps: true,
                    createdAt: "created_at",
                    updatedAt: "updated_at",
                }
            );
        } catch (error) {
            console.error("Error initializing model [Contact]:", {
                err: error,
            });
            throw error;
        }
    }
}