import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import ErrorHandler from '../Middlewares/ErrorHandler';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const cars = await carODM.find();
    const carArray = cars.map((car) => this.createCarDomain(car));
    return carArray;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    if (!car) throw new ErrorHandler(404, 'Car not found');
    return this.createCarDomain(car);
  }

  public async updateById(id: string | undefined, carToUpdate: ICar) {
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    if (!car) throw new ErrorHandler(404, 'Car not found');
    const updatedCar = await carODM.updateById(id, carToUpdate);
    return this.createCarDomain(updatedCar);
  }
}