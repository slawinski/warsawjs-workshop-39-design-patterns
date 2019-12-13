var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../../knexfile'));
const rentalService = require('../domain-model/rentalService')

router.get('/', async function(req, res) {
  const cars = await knex('cars').select('*');
  res.render('cars', { cars, title: 'Samochody do wypożyczenia' });
});

router.get('/:car_id/rent', async function(req, res) {
  const { car_id } = req.params;
  const client_id = req.session.user.user_id;

  await rentalService.rentCar({ car_id, client_id });

  res.redirect('/rentals');
});

module.exports = router;
