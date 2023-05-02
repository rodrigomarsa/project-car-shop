import { expect } from 'chai';
import sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarController from '../../../src/Controllers/CarController';
import CarService from '../../../src/Services/CarService';

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

describe('Verificando o controller de carros', function () {
  it('Deveria criar um carro com sucesso', async function () {
    const res = {} as Response;
    const req = { body: carInput } as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    sinon.stub(service, 'create').resolves(outputCar);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.create();
    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.equal(true);
    expect((res.json as sinon.SinonStub).calledWith(outputCar)).to.be.equal(true);
  });

  it('Deveria buscar todos os carros com sucesso', async function () {
    const res = {} as Response;
    const req = {} as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    sinon.stub(service, 'getAll').resolves(outputCars.map((car) => new Car(car)));

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getAll();
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
    expect((res.json as sinon.SinonStub).calledWith(outputCars
      .map((car) => new Car(car)))).to.be.equal(true);
  });
  
  it('Deveria buscar um carro específico com sucesso', async function () {
    const res = {} as Response;
    const req = { params: { id: '6449604d6f428328818375b0' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    sinon.stub(service, 'getById').resolves(outputCar);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getById();
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
    expect((res.json as sinon.SinonStub).calledWith(outputCar)).to.be.equal(true);
  });

  it('Deveria lançar uma exceção quando o carro não existe', async function () {
    const res = {} as Response;
    const req = { params: { id: '644963666f428328818375b2' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'getById').resolves(undefined);
      await controller.getById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it('Deveria lançar uma exceção quando o id do carro pesquisado é inválido', async function () {
    const res = {} as Response;
    const req = { params: { id: '6449604d6f428328818375XX' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'getById').resolves(undefined);
      await controller.getById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
    }
  });

  it('Deveria atualizar um carro específico com sucesso', async function () {
    const res = {} as Response;
    const req = { params: { id: '6449604d6f428328818375b0' },
      body: carInput } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    sinon.stub(service, 'updateById').resolves(outputCar);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.updateById();
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
    expect((res.json as sinon.SinonStub).calledWith(outputCar)).to.be.equal(true);
  });

  it('Deveria lançar uma exceção quando o carro atualizando não existe', async function () {
    const res = {} as Response;
    const req = { params: { id: '644963666f428328818375b2' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'updateById').resolves(undefined);
      await controller.updateById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it('Deveria lançar uma exceção quando o id do carro atualizando é inválido', async function () {
    const res = {} as Response;
    const req = { params: { id: '6449604d6f428328818375XX' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'updateById').resolves(undefined);
      await controller.updateById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
    }
  });

  it('Deveria apagar um carro específico com sucesso', async function () {
    const res = {} as Response;
    const req = { params: { id: '6449604d6f428328818375b0' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    sinon.stub(service, 'deleteById');

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.deleteById();
    expect((res.status as sinon.SinonStub).calledWith(204)).to.be.equal(true);
  });

  it('Deveria lançar uma exceção quando o carro há apagar não existe', async function () {
    const res = {} as Response;
    const req = { params: { id: '644963666f428328818375b2' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'deleteById').resolves(undefined);
      await controller.deleteById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it('Deveria lançar uma exceção quando o id do carro há apagar é inválido', async function () {
    const res = {} as Response;
    const req = { params: { id: '6449604d6f428328818375XX' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new CarController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'deleteById').resolves(undefined);
      await controller.deleteById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});
