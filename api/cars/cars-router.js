const router = require('express').Router();
const Cars = require('./cars-model');

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(all => {
            res.status(200).json(all);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;