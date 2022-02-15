const dbConfig = require('../../data/db-config');
const Cars = require('./cars-model');
var vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  const { id } = req.params;

    Cars.getById(id)
        .then(result => {
            if (result === null || result === undefined) {
                res.status(404).json({ message: `car with id ${id} is not found` });
            } else {
                req.car = result;
                next();
            }
        })
        .catch(err => {
            next(err);
        });
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.params;

  if (vin === null || vin === undefined) {
    res.status(400).json({ message: `${vin} is missing` });
  } else if (make === null || make === undefined) {
    res.status(400).json({ message: `${make} is missing` });
  } else if (model === null || model === undefined) {
    res.status(400).json({ message: `${model} is missing` });
  } else if (mileage === null || mileage === undefined) {
    res.status(400).json({ message: `${mileage} is missing` });
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;

  if (vinValidator.validate(vin) === false) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existing = await dbConfig('cars')
      .where('vin', req.body.vin)
      .first();

      if (existing) {
        res.status(400).json({ message: `vin ${req.body.vin} already exists` });
      } else {
        next();
      }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};