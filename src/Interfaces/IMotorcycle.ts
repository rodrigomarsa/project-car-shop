import CategoryTypes from '../Utils/CategoryTypes';
import IVehicle from './IVehicle';

interface IMotorcycle extends IVehicle{
  category: CategoryTypes;
  engineCapacity: number;
}

export default IMotorcycle;