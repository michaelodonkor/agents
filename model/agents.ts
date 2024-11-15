import { DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

const Agent = sequelize.define('Agent', {
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey:true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  agentLicence: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  practiceAreas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aboutMe: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rating: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
});

export default Agent;
