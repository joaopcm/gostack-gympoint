export const { format: formatPrice } = new Intl.NumberFormat('ptBR', {
  style: 'currency',
  currency: 'BRL',
});

export function getCurrencySymbol() {
  return formatPrice(0)
    .replace(/\d/g, '')
    .replace('.', ' ')
    .replace(',', ' ')
    .trim();
}
