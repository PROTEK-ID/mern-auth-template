import { DataTypes, Model } from "sequelize";
import db from "../config/db";

interface UserModel extends Model {
  [key: string]: any;
  username: string;
  password: string;
  email: string;
  refreshToken?: string;
}

const User = db.define<UserModel>("users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.TEXT,
  },
});

(async () => await User.sync())();

export default User;
