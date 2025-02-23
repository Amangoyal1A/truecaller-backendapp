import { DataTypes, Model, Sequelize } from "sequelize";
import { ISpamModelAttributes } from "./interface";

export class Spam extends Model<ISpamModelAttributes> {
    public static initModel(sequelize: Sequelize) {
        try {
            Spam.init(
                {
                    id: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                    phoneNumber: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    spamCount: {
                        type: DataTypes.INTEGER,
                        defaultValue: 1,
                    },
                },
                {
                    sequelize,
                    modelName: "spam",
                    freezeTableName: true,
                    tableName: "spam",
                    timestamps: true,
                    createdAt: "created_at",
                    updatedAt: "updated_at",
                }
            );
        } catch (error) {
            console.error("Error initializing model [SPAM]:", {
                err: error,
            });
            throw error;
        }
    }
}