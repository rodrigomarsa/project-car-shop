import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

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

const service = new MotorcycleService();

describe('Verificando o service de motocicletas', function () {
  it('Deveria criar uma motocicleta com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(outputMotorcycle);
    
    const result = await service.create(motorcycleInput);

    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it('Deveria buscar todos as motocicletas com sucesso', async function () {
    sinon.stub(Model, 'find').resolves(outputMotorcycles);

    const result = await service.getAll();

    expect(result).to.be.deep.equal(outputMotorcycles
      .map((motorcycle) => new Motorcycle(motorcycle)));
  });

  it('Deveria buscar uma motocicleta específica com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(outputMotorcycle);

    const result = await service.getById('644a52f9c63dffd6df47f153');

    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it('Deveria lançar uma exceção quando a motocicleta não existe', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      await service.getById('644a52f9c63dffd6df47f153');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  it(
    'Deveria lançar uma exceção quando o id da motocicleta pesquisada é inválida',
    async function () {
      sinon.stub(Model, 'findOne').resolves(false);
    
      try {
        await service.getById('644963666f428328818375XX');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    },
  );

  it('Deveria atualizar uma motocicleta específica com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(true);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(outputMotorcycle);

    const result = await service.updateById('644a52f9c63dffd6df47f153', motorcycleInput);

    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it('Deveria lançar uma exceção quando a motocicleta atualizando não existe', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      await service.updateById('644a52f9c63dffd6df47f153', motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  it(
    'Deveria lançar uma exceção quando o id da motocicleta atualizando é inválido',
    async function () {
      sinon.stub(Model, 'findOne').resolves(false);
    
      try {
        await service.updateById('644a52f9c63dffd6df47f1XX', motorcycleInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    },
  );

  afterEach(function () {
    sinon.restore();
  });
});