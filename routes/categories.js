var express = require('express');
var router = express.Router();

Category = require('../models/category.js');

router.get('/', function(req, res, next) {
    Category.getCategories(function (err, categories) {
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

router.post('/add', function (req, res) {
    req.checkBody('title', 'Title is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('add_category', {
            errors: errors,
            title: 'Add Category'
        });
    }
    else {
        var category = new Category();
        category.title = req.body.title;
        category.desciption = req.body.description;

        Category.addCategory(category, function (err, category) {
            if (err) {
                res.send(err);
            }
            else {
                req.flash('success', 'Category Saved');
                res.redirect('/manage/categories');
            }
        })
    }

});

module.exports = router;
