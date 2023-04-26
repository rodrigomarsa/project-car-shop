import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import ErrorHandler from '../Middlewares/ErrorHandler';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.find();
    const motorcycleArray = motorcycles
      .map((motorcycle) => this.createMotorcycleDomain(motorcycle));
    return motorcycleArray;
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    if (!motorcycle) throw new ErrorHandler(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(motorcycle);
  }

  public async updateById(id: string | undefined, motorcycleToUpdate: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    if (!motorcycle) throw new ErrorHandler(404, 'Motorcycle not found');
    const updatedmotorcycle = await motorcycleODM.updateById(id, motorcycleToUpdate);
    return this.createMotorcycleDomain(updatedmotorcycle);
  }
}