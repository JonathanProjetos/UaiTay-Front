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
