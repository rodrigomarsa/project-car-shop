import { expect } from 'chai';
import sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleController from '../../../src/Controllers/MotorcycleController';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const motorcycleInput: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Black',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const outputMotorcycle: Motorcycle = new Motorcycle(
  {
    id: '644a52f9c63dffd6df47f153',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Black',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 600,
  },
);

const outputMotorcycles: IMotorcycle[] = [
  {
    id: '644a52f9c63dffd6df47f153',
    model: 'Honda Biz',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 100,
  },
  {
    id: '644a5619c63dffd6df47f155',
    model: 'Fazer FZ25 ABS',
    year: 2023,
    color: 'Blue',
    status: true,
    buyValue: 40,
    category: 'Street',
    engineCapacity: 250,
  },
];

const NOT_FOUND_MESSAGE = 'Motorcycle not found';
const INVALID_MESSAGE = 'Invalid mongo id';

const service = new MotorcycleService();

describe('Verificando o controller de motocicletas', function () {
  it('Deveria criar uma motocicleta com sucesso', async function () {
    const res = {} as Response;
    const req = { body: motorcycleInput } as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
    sinon.stub(service, 'create').resolves(outputMotorcycle);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.create();
    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.equal(true);
    expect((res.json as sinon.SinonStub).calledWith(outputMotorcycle)).to.be.equal(true);
  });

  it('Deveria buscar todas as motocicletas com sucesso', async function () {
    const res = {} as Response;
    const req = {} as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
    sinon.stub(service, 'getAll').resolves(outputMotorcycles.map((moto) => new Motorcycle(moto)));

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getAll();
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
    expect((res.json as sinon.SinonStub).calledWith(outputMotorcycles
      .map((moto) => new Motorcycle(moto)))).to.be.equal(true);
  });
  
  it('Deveria buscar uma motocicleta específica com sucesso', async function () {
    const res = {} as Response;
    const req = { params: { id: '644a52f9c63dffd6df47f153' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
    sinon.stub(service, 'getById').resolves(outputMotorcycle);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getById();
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
    expect((res.json as sinon.SinonStub).calledWith(outputMotorcycle)).to.be.equal(true);
  });

  it('Deveria lançar uma exceção quando a motocicleta não existe', async function () {
    const res = {} as Response;
    const req = { params: { id: '644a52f9c63dffd6df47f150' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'getById').resolves(undefined);
      await controller.getById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it('Deveria lançar uma exceção quando o id da moto pesquisada é inválido', async function () {
    const res = {} as Response;
    const req = { params: { id: '644a52f9c63dffd6df47f1XX' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'getById').resolves(undefined);
      await controller.getById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
    }
  });

  it('Deveria atualizar uma motocicleta específica com sucesso', async function () {
    const res = {} as Response;
    const req = { params: { id: '644a52f9c63dffd6df47f153' },
      body: motorcycleInput } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
    sinon.stub(service, 'updateById').resolves(outputMotorcycle);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.updateById();
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
    expect((res.json as sinon.SinonStub).calledWith(outputMotorcycle)).to.be.equal(true);
  });

  it('Deveria lançar uma exceção quando a motocicleta atualizanda não existe', async function () {
    const res = {} as Response;
    const req = { params: { id: '644a52f9c63dffd6df47f152' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'updateById').resolves(undefined);
      await controller.updateById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it('Deveria lançar uma exceção quando o id da moto atualizanda é inválido', async function () {
    const res = {} as Response;
    const req = { params: { id: '644a52f9c63dffd6df47f1XX' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'updateById').resolves(undefined);
      await controller.updateById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
    }
  });

  it('Deveria apagar uma motocicleta específica com sucesso', async function () {
    const res = {} as Response;
    const req = { params: { id: '644a52f9c63dffd6df47f153' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
    sinon.stub(service, 'deleteById');

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.deleteById();
    expect((res.status as sinon.SinonStub).calledWith(204)).to.be.equal(true);
  });

  it('Deveria lançar uma exceção quando a motocicleta há apagar não existe', async function () {
    const res = {} as Response;
    const req = { params: { id: '644a52f9c63dffd6df47f152' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      sinon.stub(service, 'deleteById').resolves(undefined);
      await controller.deleteById();
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it('Deveria lançar uma exceção quando o id da moto há apagar é inválido', async function () {
    const res = {} as Response;
    const req = { params: { id: '644a52f9c63dffd6df47f1XX' } } as unknown as Request;
    const next = (() => {}) as NextFunction;
    const controller = new MotorcycleController(req, res, next, service);
    
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
