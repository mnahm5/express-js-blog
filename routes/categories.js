var express = require('express');
var router = express.Router();

Category = require('../models/category.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    Category.getCategory(function (err, categories) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('categories', {
                title: 'Categories',
                categories: categories
            })
        }
    });
});

module.exports = router;
