import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

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

const outputCars: ICar[] = [
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
];

const NOT_FOUND_MESSAGE = 'Car not found';
const INVALID_MESSAGE = 'Invalid mongo id';

const service = new CarService();

describe('Verificando o service de carros', function () {
  it('Deveria criar um carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(outputCar);
    
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(outputCar);
  });
  
  it('Deveria buscar todos os carros com sucesso', async function () {
    sinon.stub(Model, 'find').resolves(outputCars);

    const result = await service.getAll();

    expect(result).to.be.deep.equal(outputCars.map((car) => new Car(car)));
  });

  it('Deveria buscar um carro específico com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(outputCar);

    const result = await service.getById('644963666f428328818375b2');

    expect(result).to.be.deep.equal(outputCar);
  });

  it('Deveria lançar uma exceção quando o carro não existe', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      await service.getById('644963666f428328818375b2');
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it('Deveria lançar uma exceção quando o id do carro pesquisado é inválido', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      await service.getById('6449604d6f428328818375XX');
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
    }
  });

  it('Deveria atualizar um carro específico com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(true);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(outputCar);

    const result = await service.updateById('644963666f428328818375b2', carInput);

    expect(result).to.be.deep.equal(outputCar);
  });

  it('Deveria lançar uma exceção quando o carro atualizando não existe', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      await service.updateById('644963666f428328818375b2', carInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it('Deveria lançar uma exceção quando o id do carro atualizando é inválido', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      await service.updateById('6449604d6f428328818375XX', carInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
    }
  });

  it('Deveria apagar um carro específico com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(true);
    sinon.stub(Model, 'deleteOne').resolves();

    const result = await service.deleteById('644963666f428328818375b2');

    expect(result).to.be.deep.equal(undefined);
  });

  it('Deveria lançar uma exceção quando o carro há apagar não existe', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      await service.deleteById('644963666f428328818375b2');
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it('Deveria lançar uma exceção quando o id do carro há apagar é inválido', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      await service.deleteById('6449604d6f428328818375XX');
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});
