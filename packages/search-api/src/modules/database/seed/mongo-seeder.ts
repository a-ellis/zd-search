import { Seeder, SeederConfig } from 'mongo-seeding';
import { MONGO_CONFIG } from '../config/mongo.config';
import { resolve } from 'path';

const config: SeederConfig = {
  database: {
    protocol: 'mongodb',
    host: MONGO_CONFIG.HOST,
    port: MONGO_CONFIG.PORT,
    name: MONGO_CONFIG.DATABASE,
  },
  dropDatabase: true,
  dropCollections: false,
  databaseReconnectTimeout: 10000
};

/**
 * Locates data sources and imports them as collections into the conencted mongodb instance.
 */
const seedDatabase = async () => {
  const seeder = new Seeder(config);
  const collections = seeder.readCollectionsFromPath(resolve(__dirname, './data'));

  try {
    console.log('Beginning mongodb seed...');
    await seeder.import(collections);
    console.log('Seeding completed successfully');
  } catch (err) {
    console.error('There was an issue seeding mongodb:');
    console.error(err);
  }
}

seedDatabase();
