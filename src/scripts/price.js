const rubFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** 326.4 → "326,40 ₽", 1432 → "1 432 ₽" */
export function formatPrice(value) {
  const hasKopecks = !Number.isInteger(value);
  return rubFormatter
    .formatToParts(value)
    .map(({ type, value: part }) => {
      if (type === 'fraction' && hasKopecks) return part.padEnd(2, '0');
      return part;
    })
    .join('');
}

/** Discount in whole percent, 0 when there is no old price. */
export function getDiscount(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}
