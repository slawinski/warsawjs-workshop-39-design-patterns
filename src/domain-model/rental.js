class Rental {
  constructor(rental_id, car_id, client_id, deposit) {
    this.rental_id = rental_id;
    this.car_id = car_id;
    this.client_id = client_id;
    this.deposit = deposit;
    this.state = RentalState.RESERVED;
  }
  setState(state) {
    this.state = state
  }
  payDeposit() {
    if (this.state !== 'RESERVED') {
      return;
    }
    this.state = 'DEPOSIT_PAID';
  }
  returnDeposit() {
    if (this.state !== 'DEPOSIT_PAID' && this.state !== 'CAR_RETURNED') {
      return;
    }
    this.state = 'DEPOSIT_SETTLED';
  }
  takeCar() {
    if (this.state !== 'DEPOSIT_PAID') {
      return;
    }
    this.state = 'CAR_IN_USE';
  }
  returnCar() {
    if (this.state !== 'CAR_IN_USE') {
      return;
    }
    this.state = 'CAR_RETURNED';
  }
}

class RentalState {
  constructor(name){
    this.name = name;
  }
  static get RESERVED() {
    return new RentalState(RESERVED)
  }
}
module.exports = Rental;