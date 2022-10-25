const { isDay } = require('../utils/helpers');

test('isDay works correctly', () => {
  expect(
    isDay({ sunrise: 1666610573, sunset: 1666649423 }, 1666610572000)
  ).toBe(false);
  expect(
    isDay({ sunrise: 1666610573, sunset: 1666649423 }, 1666649424000)
  ).toBe(false);
  expect(
    isDay({ sunrise: 1666610573, sunset: 1666649423 }, 1666629998000)
  ).toBe(true);
});
