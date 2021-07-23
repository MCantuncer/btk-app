import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import database from '../../config/database';
import { UserModel } from '../user/model';
import { EntityWithIdAndDates } from '../base/entity';

export const connectDatabase = async (): Promise<void> => {
  await DatabaseHelpers.connectDatabase(database.mongo.connString);
};

export const createCollections = async (): Promise<void> => {
  await DatabaseHelpers.createCollections([UserModel]);
};

export const closeDatabaseConn = async (): Promise<void> => {
  await DatabaseHelpers.closeDatabaseConn();
};

export class DatabaseHelpers {
  static async connectDatabase(connString: string): Promise<number> {
    if (process.env.NODE_ENV == 'test') {
      const mms = require('mongodb-memory-server');
      const replSet = new mms.MongoMemoryReplSet({
        replSet: { storageEngine: 'wiredTiger' },
      });
      await replSet.waitUntilRunning();
      connString = await replSet.getUri();
    }

    const db = await mongoose.connect(connString, {
      useNewUrlParser: true,
      useFindAndModify: false,
      replicaSet: 'rs0',
      useUnifiedTopology: true,
      ha: true, // Make sure the high availability checks are on
      haInterval: 10000, // Run every 10 seconds
    });

    mongoose.set('debug', !!process.env.DEBUG);
    return db.connections[0].readyState;
  }

  static async closeDatabaseConn(): Promise<void> {
    await mongoose.connection.close();
  }

  static async dropDatabase(): Promise<void> {
    await mongoose.connection.dropDatabase();
  }

  static async createCollections(models: ReturnModelType<any, {}>[]): Promise<void> {
    for (const model of models) {
      try {
        await model.createCollection();
        await model.init();
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

export class ModelUtils {
  public static async saveModel<T extends EntityWithIdAndDates>(manager: ReturnModelType<any>, model: T) {
    const existingModel = await manager.findOne({ _id: model._id }).exec();
    model.updatedAt = new Date();

    if (existingModel) {
      const result = await manager.findOneAndUpdate({ _id: model._id }, model).exec();
      return { result: result.toObject(), isUpdate: true };
    } else {
      model.createdAt = new Date();
      const result = await manager.create(model);
      return { result: result.toObject(), isUpdate: false };
    }
  }
}
