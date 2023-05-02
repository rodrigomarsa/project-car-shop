import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';

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

const motorcycleODM = new MotorcycleODM();

describe('Verificando o model de motocicletas', function () {
  it('Deveria criar uma motocicleta com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(outputMotorcycle);

    const result = await motorcycleODM.create(motorcycleInput);

    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it('Deveria buscar todos as motocicletas com sucesso', async function () {
    sinon.stub(Model, 'find').resolves(outputMotorcycles);

    const result = await motorcycleODM.find();

    expect(result).to.be.deep.equal(outputMotorcycles);
  });

  it('Deveria buscar uma motocicleta específica com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(outputMotorcycle);

    const result = await motorcycleODM.findById('644a52f9c63dffd6df47f153');

    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it('Deveria lançar uma exceção quando a motocicleta não existe', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      await motorcycleODM.findById('644a52f9c63dffd6df47f150');
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it(
    'Deveria lançar uma exceção quando o id da motocicleta pesquisada é inválido',
    async function () {
      sinon.stub(Model, 'findOne').resolves(false);
    
      try {
        await motorcycleODM.findById('644a52f9c63dffd6df47f1XX');
      } catch (error) {
        expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
      }
    },
  );

  it('Deveria atualizar uma motocicleta específica com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(true);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(outputMotorcycle);

    const result = await motorcycleODM.updateById('644a52f9c63dffd6df47f153', motorcycleInput);

    expect(result).to.be.deep.equal(outputMotorcycle);
  });

  it('Deveria lançar uma exceção quando a motocicleta atualizanda não existe', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    sinon.stub(Model, 'findByIdAndUpdate').resolves();
    
    try {
      await motorcycleODM.updateById('644a52f9c63dffd6df47f150', motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it(
    'Deveria lançar uma exceção quando o id da motocicleta atualizanda é inválido',
    async function () {
      sinon.stub(Model, 'findOne').resolves(false);
    
      try {
        await motorcycleODM.updateById('644a52f9c63dffd6df47f1XX', motorcycleInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
      }
    },
  );

  it('Deveria apagar uma motocicleta específica com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(true);
    sinon.stub(Model, 'deleteOne').resolves();

    const result = await motorcycleODM.deleteById('644a52f9c63dffd6df47f153');

    expect(result).to.be.deep.equal(undefined);
  });

  it('Deveria lançar uma exceção quando a motocicleta há apagar não existe', async function () {
    sinon.stub(Model, 'findOne').resolves(false);
    sinon.stub(Model, 'deleteOne').resolves();
    
    try {
      await motorcycleODM.deleteById('644a52f9c63dffd6df47f150');
    } catch (error) {
      expect((error as Error).message).to.be.equal(NOT_FOUND_MESSAGE);
    }
  });

  it(
    'Deveria lançar uma exceção quando o id da motocicleta há apagar é inválido', 
    async function () {
      sinon.stub(Model, 'findOne').resolves(false);
    
      try {
        await motorcycleODM.deleteById('644a52f9c63dffd6df47f1XX');
      } catch (error) {
        expect((error as Error).message).to.be.equal(INVALID_MESSAGE);
      }
    },
  );

  afterEach(function () {
    sinon.restore();
  });
});