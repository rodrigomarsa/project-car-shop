import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Deveria criar um carro', function () {
  it('Deveria criar um carro com sucesso', async function () {
    const carInput: ICar = {
      model: 'Fusca',
      year: 2000,
      color: 'Red',
      status: true,
      buyValue: 20.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const outputCar: Car = new Car(
      {
        id: '6449604d6f428328818375b0',
        model: 'Fusca',
        year: 2000,
        color: 'Red',
        status: true,
        buyValue: 20.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
    sinon.stub(Model, 'create').resolves(outputCar);

    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(outputCar);
  });
});
