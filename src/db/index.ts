import { Sequelize } from 'sequelize';

interface DBInterface {
  _sequelize: Sequelize,
  testConnection(): void,
}

type DBParam = string | null | undefined;

interface DBParams {
  DB_HOST: DBParam,
  DB_PORT: DBParam,
  DB_USER: DBParam,
  DB_PASSWORD: DBParam,
  DB_NAME: DBParam,
}

class DB implements DBInterface {
  _sequelize: Sequelize;

  constructor({
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
  }: DBParams) {
    this._sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
  }

  get sequelize() {
    return this._sequelize;
  }

  async testConnection() {
    try {
      await this._sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

export default DB;
