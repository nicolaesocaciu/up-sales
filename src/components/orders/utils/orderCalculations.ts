
interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
}

export const calculateOrderValue = (selectedProducts: Product[]) => {
  return selectedProducts.reduce((total, product) => {
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    return total + price;
  }, 0).toFixed(2);
};
