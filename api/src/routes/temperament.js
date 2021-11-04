const {Router} = require('express');
const { Temperament } = require('../db');

const router = Router();

router.get('/', async (req, res) => {

    try {
        const arr = await Temperament.findAll()
        res.json(arr)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;