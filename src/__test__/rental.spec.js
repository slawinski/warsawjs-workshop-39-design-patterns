const Rental = require('../domain-model/rental');

describe('Rental class', () => {
  test('should change state to deposit paid', () => {
    const rental = new Rental(1, 1, 1, 80000);
    rental.payDeposit();
    expect(rental.getState().equals(Rental.RentalState.DEPOSIT_PAID)).toBe(
      true
    );
  });
});

describe('Rental class', () => {
  test('should change state to deposit returned', () => {
    const builder = new RentalBuilder();
    const rental = builder
      .rentBy(1)
      .selectCar(2)
      .depositAmount(80000)
      .inState(Rental.RentalState.DEPOSIT_PAID)
      .build()
    rental.returnDeposit();
    expect(rental.getState().equals(Rental.RentalState.DEPOSIT_SETTLED)).toBe(
      true
    );
  });
});

class RentalBuilder {
  constructor() {
    this.rental_id = 1;
  }
  rentBy(client_id) {
    this.client_id = client_id;
    return this;
  }
  selectCar(car_id) {
    this.car_id = car_id;
    return this;
  }
  depositAmount(deposit) {
    this.deposit = deposit;
    return this;
  }
  inState(state) {
    this.state = state;
    return this;
  }
  build() {
    const { rental_id, car_id, client_id, deposit, state } = this;
    return new Rental(rental_id, car_id, client_id, deposit, state);
  }
}