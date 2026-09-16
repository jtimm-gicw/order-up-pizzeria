const { handleOrder } = require('../demo/modular/kitchen');
const events = require('../demo/modular/events');

describe('Kitchen handler', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('emits confirmed and in-the-oven for a new order', () => {
    const emitSpy = jest.spyOn(events, 'emit');

    const order = {
      orderId: 42,
      items: ['Cheese Pizza'],
      address: '123 Main Street',
    };

    handleOrder(order);

    expect(emitSpy).toHaveBeenCalledWith(
      'confirmed',
      expect.objectContaining({
        orderId: 42,
        status: 'confirmed',
      })
    );

    expect(emitSpy).toHaveBeenCalledWith(
      'in-the-oven',
      expect.objectContaining({
        orderId: 42,
        status: 'in-the-oven',
      })
    );
  });
});
