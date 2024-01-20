const connection = require('./connection');

// Fetch every sale from the sales table or throw an error if it isn`t possible.
const fetchAllSales = async () => {
  try {
    const [salesList] = await connection.execute('SELECT * FROM sales');
    return salesList; 
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error; 
  }
};

const fetchSale = async (saleId) => {
  try {
    const [[sale]] = await connection.execute(
      'SELECT * FROM sales WHERE id = ?', 
      [saleId],
    );
    return sale;
  } catch (error) {
    console.error('Error fetching sale:', error);
    throw error; 
  }
};

module.exports = {
  fetchAllSales,
  fetchSale,
};