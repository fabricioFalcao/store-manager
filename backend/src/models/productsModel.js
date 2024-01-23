const camelize = require('camelize');
const connection = require('./connection');

const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
} = require('../utils/generateFormattedQuery');

// Fetch every product from the products table or throw an error if it isn`t possible.
const fetchAllProducts = async () => {
  const [productsList] = await connection.execute('SELECT * FROM products');
  return camelize(productsList);
};

const fetchProduct = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?', 
    [productId],
  );
  return camelize(product);
};

const registerProduct = async (productData) => {
  const columns = getFormattedColumnNames(productData);
  const placeholders = getFormattedPlaceholders(productData);
  const query = `INSERT INTO products (${columns}) VALUE (${placeholders});`;
  
  const [{ insertId }] = await connection.execute(query, [...Object.values(productData)]);
  return insertId;
};

const updateProduct = async (productId, updateData) => {
  const columns = getFormattedUpdateColumns(updateData);
  const query = `UPDATE products SET ${columns} WHERE id = ?;`;
  
  const [{ affectedRows }] = await connection
    .execute(query, [...Object.values(updateData), productId]);
  return affectedRows === 1;
};

const deleteProduct = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?', 
    [productId],
  );
  return affectedRows === 1;
};

const searchProduct = async (term) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?',
    [`%${term}%`],
  );
  return camelize(product);
};

module.exports = {
  fetchAllProducts,
  fetchProduct,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};