const db = require('../transaction-script/databaseGateway')
const EventBus = require('../pubsub/event-bus');

async function rentCar({ car_id, client_id }) {

  const car = await db.findCar(car_id);
  const clientRentalCount = await db.countRentals(client_id)
  const client = await db.findClient(client_id)

  let deposit = 0;
  if (clientRentalCount < 1 && !client.isVip) {
    deposit = new NewClientStrategy(car).deposit;
  } else if (clientRentalCount >= 1 && !client.isVip) {
    deposit = new ReturningClientStrategy(car).deposit;
  } else if (client.isVip) {
    deposit = new VipClientStrategy(car).deposit;
  }

  await db.insertRental(car_id, client_id, deposit)

  EventBus.publish('CAR_RENTED', { car_id, client_id, deposit })
}

class DepositCalculator {
  constructor(car) {
    this.car = car
  }

  get deposit() {
    throw new Error('subclass responsibility');
  }
}

class NewClientStrategy extends DepositCalculator {
  get deposit() {
    return Math.max(10000, this.car.price * 0.2);
  }
}

class ReturningClientStrategy extends DepositCalculator {
  get deposit() {
    return Math.min(Math.max(10000, this.car.price * 0.15), 60000);
  }
}

class VipClientStrategy extends DepositCalculator {
  get deposit() {
    return Math.min(Math.max(5000, this.car.price * 0.1), 40000);
  }
}

module.exports = { rentCar };