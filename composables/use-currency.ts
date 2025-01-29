export function useCurrency() {
  const formatCurrency = (value: number) => `$ ${value.toLocaleString()}`;
  return { formatCurrency };
}
