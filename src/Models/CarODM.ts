import {
  isValidObjectId,
  Model,
  Schema,
  model,
  models,
  UpdateQuery,
} from 'mongoose';
import ICar from '../Interfaces/ICar';
import ErrorHandler from '../Middlewares/ErrorHandler';

export default class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async find(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findById(_id: string | undefined): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw new ErrorHandler(422, 'Invalid mongo id');
    return this.model.findOne({ _id });
  }

  public async updateById(_id: string | undefined, carToUpdate: ICar): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw new ErrorHandler(422, 'Invalid mongo id');
    return this.model.findByIdAndUpdate(
      { _id },
      { ...carToUpdate } as UpdateQuery<ICar>,
      { new: true },
    );
  }
}