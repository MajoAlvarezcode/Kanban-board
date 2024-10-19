import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

// Asegúrate de que las variables de entorno están definidas
const dbName = process.env.DB_NAME!;
const dbUsername = process.env.DB_USERNAME!;
const dbPassword = process.env.DB_PASSWORD!;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined; // Convierte a número

const sequelize = process.env.DB_URL 
  ? new Sequelize(process.env.DB_URL) 
  : new Sequelize(dbName, dbUsername, dbPassword, {
      host: 'localhost',
      dialect: 'postgres',
      ...(dbPort !== undefined && { port: dbPort }), // Agrega la propiedad port solo si está definida
      dialectOptions: {
          decimalNumbers: true
      }
  });

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

export { sequelize, User, Ticket };
