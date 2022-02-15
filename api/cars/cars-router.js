const router = require('express').Router();
const Cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(all => {
            res.status(200).json(all);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/:id', checkCarId, (req, res) => {
    res.status(200).json(req.car);
});

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, (req, res, next) => {
    const { vin, make, model, mileage } = req.body;
    Cars.create({ vin, make, model, mileage })
        .then(car => {
            res.status(201).json(car);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;