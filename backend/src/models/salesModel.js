const camelize = require('camelize');
const connection = require('./connection');

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

module.exports = {
  fetchAllSales,
  fetchSale,
};