const camelize = require('camelize');
const connection = require('./connection');

const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

// Fetch every sale from the sales table or throw an error if it isn`t possible.
const fetchAllSales = async () => {
  try {
    const [salesList] = await connection.execute(`SELECT 
    sp.sale_id, 
    sa.date, 
    sp.product_id, 
    sp.quantity 
    FROM sales as sa INNER JOIN sales_products as sp
    ON sa.id = sp.sale_id
    ORDER BY sp.sale_id ASC, sp.product_id ASC`);
    return camelize(salesList); 
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error; 
  }
};

const fetchSale = async (saleId) => {
  try {
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
  } catch (error) {
    console.error('Error fetching sale:', error);
    throw error; 
  }
};

const registerSale = async (saleData) => {
  try {
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
  } catch (error) {
    console.error('Error registering sale:', error);
    throw error; 
  }
};

const deleteSale = async (saleId) => {
  try {
    const [{ affectedRows }] = await connection.execute(
      'DELETE FROM sales WHERE id = ?', 
      [saleId],
    );
    return affectedRows === 1;
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error; 
  }
};

module.exports = {
  fetchAllSales,
  fetchSale,
  registerSale,
  deleteSale,
};