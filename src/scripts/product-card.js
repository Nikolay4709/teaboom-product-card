import { formatPrice, getDiscount } from './price.js';

export function initProductCard(root) {
  const form = root.querySelector('[data-product-form]');
  const sku = root.querySelector('[data-product-sku]');
  const price = root.querySelector('[data-product-price]');
  const oldPrice = root.querySelector('[data-product-old-price]');
  const discount = root.querySelector('[data-product-discount]');
  const status = root.querySelector('[data-product-status]');

  const getSelected = () => form.querySelector('input[name="weight"]:checked');

  const render = () => {
    const option = getSelected();
    const current = Number(option.dataset.price);
    const old = Number(option.dataset.oldPrice);
    const percent = getDiscount(current, old);

    sku.textContent = option.dataset.sku;
    price.textContent = formatPrice(current);
    oldPrice.textContent = percent ? formatPrice(old) : '';
    oldPrice.hidden = !percent;
    discount.textContent = `−${percent}%`;
    discount.hidden = !percent;
    status.textContent = '';
  };

  form.addEventListener('change', render);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const option = getSelected();
    status.textContent = `Добавлено в корзину: ${option.value} г за ${price.textContent}`;
  });

  render();
}
