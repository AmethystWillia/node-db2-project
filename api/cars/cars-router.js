const router = require('express').Router();
const Cars = require('./cars-model');
const { checkCarId } = require('./cars-middleware');

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

module.exports = router;