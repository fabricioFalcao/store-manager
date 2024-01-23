const camelize = require('camelize');
const connection = require('./connection');

const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
} = require('../utils/generateFormattedQuery');

// Fetch every sale from the sales table or throw an error if it isn`t possible.
const fetchAllSales = async () => {
  const [salesList] = await connection.execute(`SELECT 
    sp.sale_id, 
    sa.date, 
    sp.product_id, 
    sp.quantity 
    FROM sales as sa INNER JOIN sales_products as sp
    ON sa.id = sp.sale_id
    ORDER BY sp.sale_id ASC, sp.product_id ASC`);
  return camelize(salesList);
};

const fetchSale = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT  
      sa.date, 
      sp.product_id, 
      sp.quantity 
      FROM sales as sa INNER JOIN sales_products as sp
      ON sa.id = sp.sale_id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id ASC, sp.product_id ASC;`, 
    [saleId],
  );
  return camelize(sale);
};

const fetchSaleProduct = async (saleId, productId) => {
  const [sale] = await connection.execute(
    `SELECT  
      sa.date, 
      sp.product_id, 
      sp.quantity,
      sp.sale_id 
      FROM sales as sa INNER JOIN sales_products as sp
      ON sa.id = sp.sale_id
      WHERE sp.sale_id = ? AND sp.product_id = ?
      ORDER BY sp.sale_id ASC, sp.product_id ASC;`,  
    [saleId, productId],
  );
  return camelize(sale);
};

const registerSale = async (saleData) => {
  const [{ insertId: saleId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  await Promise.all(saleData.map(async (item) => {
    const saleProduct = { saleId, ...item };
      
    const columns = getFormattedColumnNames(saleProduct);
    const placeholders = getFormattedPlaceholders(saleProduct);
    const query = `INSERT INTO sales_products (${columns}) VALUES (${placeholders});`; 

    await connection.execute(query, [...Object.values(saleProduct)]);
  }));
    
  return saleId;
};

const deleteSale = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?', 
    [saleId],
  );
  return affectedRows === 1;
};

const updateSale = async (saleId, productId, quantity) => {
  const columns = getFormattedUpdateColumns(quantity);
  const query = `UPDATE sales_products SET ${columns} WHERE sale_id = ? AND product_id = ?;`;
  
  const [{ affectedRows }] = await connection
    .execute(query, [...Object.values(quantity), saleId, productId]);
  return affectedRows === 1;
};

module.exports = {
  fetchAllSales,
  fetchSale,
  registerSale,
  deleteSale,
  updateSale,
  fetchSaleProduct,
};