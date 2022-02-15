const Cars = require('./cars-model');

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
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId,
};