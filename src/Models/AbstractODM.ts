import {
  isValidObjectId,
  Model,
  models,
  Schema,
  UpdateQuery,
  model,
} from 'mongoose';
import ErrorHandler from '../Middlewares/ErrorHandler';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(_id: string | undefined): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new ErrorHandler(422, 'Invalid mongo id');
    return this.model.findOne({ _id });
  }

  public async updateById(_id: string | undefined, vehicle: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new ErrorHandler(422, 'Invalid mongo id');

    return this.model.findByIdAndUpdate(
      { _id },
      { ...vehicle } as UpdateQuery<T>,
      { new: true },
    );
  }
}

export default AbstractODM;
