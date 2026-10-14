import { describe, expect, it } from 'vitest';
import { formatPrice, getDiscount } from './price.js';

const normalize = (text) => text.replace(/\s/g, ' ');

describe('formatPrice', () => {
  it('keeps two kopeck digits for fractional prices', () => {
    expect(normalize(formatPrice(326.4))).toBe('326,40 ₽');
  });

  it('omits kopecks for whole prices and groups thousands', () => {
    expect(normalize(formatPrice(1432))).toBe('1 432 ₽');
    expect(normalize(formatPrice(8710))).toBe('8 710 ₽');
  });
});

describe('getDiscount', () => {
  it('rounds discount to whole percent', () => {
    expect(getDiscount(326.4, 349.2)).toBe(7);
    expect(getDiscount(6320, 8710)).toBe(27);
  });

  it('returns 0 without a real discount', () => {
    expect(getDiscount(100, 0)).toBe(0);
    expect(getDiscount(100, 100)).toBe(0);
  });
});
