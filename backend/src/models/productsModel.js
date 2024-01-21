const camelize = require('camelize');
const connection = require('./connection');

const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

// Fetch every product from the products table or throw an error if it isn`t possible.
const fetchAllProducts = async () => {
  try {
    const [productsList] = await connection.execute('SELECT * FROM products');
    return camelize(productsList); 
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
    return camelize(product);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

const registerProduct = async (productData) => {
  try {
    const columns = getFormattedColumnNames(productData);
    const placeholders = getFormattedPlaceholders(productData);
    const query = `INSERT INTO products (${columns}) VALUE (${placeholders});`;
  
    const [{ insertId }] = await connection.execute(query, [...Object.values(productData)]);
    return insertId;
  } catch (error) {
    console.error('Error registering product:', error);
    throw error; 
  }
};

module.exports = {
  fetchAllProducts,
  fetchProduct,
  registerProduct,
};