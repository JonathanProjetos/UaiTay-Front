export const groupProducts = (products = []) => {
  const grouped = {};

  products.forEach((item) => {
    if (!grouped[item.name]) {
      grouped[item.name] = {
        ...item,
        count: 1,
        totalPrice: item.price,
      };
      return;
    }

    grouped[item.name].count += 1;
    grouped[item.name].totalPrice += item.price;
  });

  return Object.values(grouped);
};

export const formatCurrency = (value) => {
  if (typeof value !== 'number') return '00,00';

  return value.toFixed(2).replace('.', ',');
};

export const normalizeCurrencyValue = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;

  const normalizedValue = String(value ?? '').replace(',', '.');
  const numberValue = Number(normalizedValue);

  return Number.isFinite(numberValue) ? numberValue : 0;
};

export const getOrderFinalTotal = (orderData = {}) => {
  const hasDiscount = Boolean(orderData.checkedDiscount || orderData.discount === 'Sim');
  const subtotal = hasDiscount
    ? normalizeCurrencyValue(orderData.priceWithDiscount ?? orderData.total)
    : normalizeCurrencyValue(orderData.total);

  return subtotal + normalizeCurrencyValue(orderData.taxFee);
};

export const formatOrderDate = (date) => {
  if (!date) return '';

  return String(date).split('-').join('/');
};

export const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');
