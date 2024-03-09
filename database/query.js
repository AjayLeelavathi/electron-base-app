const { getConnection } = require('./connection');


const getCategory = async () => {
  try {
    const result = await getAllRecord("SELECT * FROM tbl_category where status = 1");
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addCategory = async (category) => {
  try {
    const result = await insertRecord(`INSERT INTO tbl_category (name,description) VALUES ('${category.name}','${category.description}')`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async () => {
  try {
    const result = await getAllRecord("SELECT tbl_product.*,tbl_category.name as category_name FROM tbl_product INNER JOIN tbl_category on tbl_product.category_id = tbl_category.id where tbl_product.delete_status = 0");
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (product) => {
  try {
    // console.log(product)
    const result = await insertRecord(`INSERT INTO tbl_product (category_id,qr_code,name,description,price,tax_amount,tax_type) VALUES ('${product.category_id}','${product.qr_code}','${product.name}','${product.description}','${product.price}','${product.tax_amount}','${product.tax_type}')`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAllRecord = async(query) =>{
  const conn = await getConnection();
  return new Promise(res => {
      conn.all(query, (err, rows) => {
        res(rows);
      });
  });
};

const insertRecord = async(query) =>{
  const conn = await getConnection();
  conn.run(query);
  return true;
};

module.exports = {
  getCategory,
  addCategory,
  getProduct,
  addProduct
};