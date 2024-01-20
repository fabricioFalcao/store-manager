const connection = require('./connection');

// Fetch every product from the products table or throw an error if it isn`t possible.
const fetchAllProducts = async () => {
  try {
    const [productsList] = await connection.execute('SELECT * FROM products');
    return productsList; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

const fetchProduct = async (productId) => {
  try {
    const [[product]] = await connection.execute(
      'SELECT * FROM products WHERE id = ?', 
      [productId],
    );
    return product;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

module.exports = {
  fetchAllProducts,
  fetchProduct,
};