\
function findCar(car_id) {
  return knex('cars')
    .first()
    .where('car_id', car_id);
}

async function countRentals(client_id) {
  const { clientRentalCount } = await knex('rentals')
    .first()
    .count('client_id as clientRentalCount')
    .where('client_id', client_id);
  return clientRentalCount
}

function findClient(client_id) {
  return knex('users')
    .first()
    .where('user_id', client_id);
}

async function insertRental(car_id, client_id, deposit) {
  await knex('rentals').insert({
    car_id,
    client_id,
    deposit,
    state: 'RESERVED',
  });
}

module.exports = {
  findCar,
  countRentals,
  findClient,
  insertRental
}