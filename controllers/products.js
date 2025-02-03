const express = require("express");
const router = express.Router();
const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('products/index.ejs', {
            products: currentUser.products,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.get('/new', async (req, res) => {
    res.render('products/new.ejs');
});


router.get('/:productId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const product = currentUser.products.id(req.params.productId);
        res.render('products/show.ejs', {
            product: product,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.get('/:productId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const product = currentUser.products.id(req.params.productId);
        res.render('products/edit.ejs', {
            product: product,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.delete('/:productId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.products.id(req.params.productId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/products`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.put('/:productId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const product = currentUser.products.id(req.params.productId);
        product.set(req.body);
        await currentUser.save();
        res.redirect(
            `/users/${currentUser._id}/products/${req.params.productId}`
        );
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.products.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/products`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router
