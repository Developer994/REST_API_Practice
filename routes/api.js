const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninjas')

// Get a list of ninjas from the database
router.get('/ninjas', function (req, res, next) {
    /*Ninja.find({}).then(function(ninjas){
        res.send(ninjas);
    })*/
    Ninja.aggregate([{
        $geoNear: {
            near: {
                type: 'Point', coordinates: [parseFloat(req.query.lng),
                parseFloat(req.query.lat)]
            }, spherical: true, maxDistance: 100000, distanceField:
                "dist.calculated"
        }
    }]).then(function (results) { res.send(results); });
});

router.post('/ninjas', function (req, res, next) {
    // The Ninja is created with a capital N because its the Ninja model and we're creating a new instance for that.
    Ninja.create(req.body).then(function (ninja) { //Once the Ninja.create is done, then we fire some more code through .then.
        res.send(ninja); //Here, we just send back the ninja that we have saved to the database.
    }).catch(next);
});

router.put('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
            res.send(ninja);
        })
    })

});

router.delete('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndRemove({ _id: req.params.id }).then(function (ninja) {
        res.send(ninja)
    })
});

module.exports = router;