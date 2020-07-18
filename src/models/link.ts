import { DataTypes, Model } from 'sequelize';
import db from '@db/index';

export interface LinkInterface {
  hash: string,
  link: string,
}

class Link extends Model {}

Link.init({
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize: db.sequelize,
  modelName: 'Link',
});

export default Link;
