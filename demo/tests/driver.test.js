const { handlePickup } = require('../demo/modular/driver');
const events = require('../demo/modular/events');

describe('Driver handler', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('emits out-for-delivery when a driver accepts a pickup', () => {
    const emitSpy = jest.spyOn(events, 'emit');

    handlePickup({
      orderId: 42,
      status: 'ready-for-pickup',
      timestamp: new Date().toISOString(),
    });

    expect(emitSpy).toHaveBeenCalledWith(
      'out-for-delivery',
      expect.objectContaining({
        orderId: 42,
        status: 'out-for-delivery',
      })
    );
  });
});
