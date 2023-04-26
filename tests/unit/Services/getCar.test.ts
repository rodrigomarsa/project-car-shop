import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Deveria buscar os carros', function () {
  it('Deveria buscar todos os carros com sucesso', async function () {
    const outputCars = [
      {
        id: '6449604d6f428328818375b0',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '644963666f428328818375b2',
        model: 'Fusca',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
    ].map((car) => new Car(car));
  
    sinon.stub(Model, 'find').resolves(outputCars);

    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(outputCars);
  });

  it('Deveria buscar um carro específico com sucesso', async function () {
    const outputCar: Car = new Car(
      {
        id: '644963666f428328818375b2',
        model: 'Fusca',
        year: 2000,
        color: 'Red',
        status: true,
        buyValue: 20.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
  
    sinon.stub(Model, 'findOne').resolves(outputCar);

    const service = new CarService();
    const result = await service.getById('644963666f428328818375b2');

    expect(result).to.be.deep.equal(outputCar);
  });

  it('Deveria lançar uma exceção quando o carro não existe', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      const service = new CarService();
      await service.getById('644963666f428328818375b2');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  it('Deveria lançar uma exceção quando o id é inválido', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      const service = new CarService();
      await service.getById('6449604d6f428328818375XX');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});