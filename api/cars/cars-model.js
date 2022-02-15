const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
}

const getById = (id) => {
  return db('cars')
    .where('id', id).first()
}

const create = async ({ vin, make, model, mileage }) => {
  let [id] = await db('cars')
    .insert({ vin, make, model, mileage });

  return {
    id: id,
    vin,
    make,
    model,
    mileage
  }
}

module.exports = {
  getAll,
  getById,
  create,
};