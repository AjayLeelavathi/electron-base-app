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

const getDiscount = async () => {
  try {
    const result = await getAllRecord("SELECT tbl_discount.*,tbl_product.id as product_id,tbl_product.name as product_name FROM tbl_discount INNER JOIN tbl_product ON tbl_discount.product_id = tbl_product.id where tbl_discount.delete_status = 0");
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addDiscount = async (discount) => {
  try {
    // console.log(product)
    const result = await insertRecord(`INSERT INTO tbl_discount (name,product_id,discount_type,discount_value,status) VALUES ('${discount.name}','${discount.product_id}','${discount.discount_type}','${discount.discount_value}','${discount.status}')`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getCustomer = async () => {
  try {
    const result = await getAllRecord("SELECT * FROM tbl_customer where delete_status = 0");
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addCustomer = async (customer) => {
  try {
    // console.log(product)
    const result = await insertRecord(`INSERT INTO tbl_customer (name,address,phone_number) VALUES ('${customer.name}','${customer.address}','${customer.phone_number}')`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getInvoiceCount = async () => {
  try {
    const result = await getAllRecord("SELECT count(*) as invoice_count FROM tbl_order");
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (product_id) => {
  try {
    const result = await getOneRecord(`SELECT * FROM tbl_product where id = ${product_id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getDiscountById = async (product_id) => {
  try {
    const result = await getAllRecord(`SELECT * FROM tbl_discount where product_id = ${product_id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addOrder = async (order) => {
  try {
    const result = await insertRecord(`INSERT INTO tbl_order (order_id,invoice_id,customer_id,order_date,items,sub_total,tax,tax_type,discount,discount_type,total,payment_mode,paid) VALUES ('${order.order_id}','${order.invoice_id}','${order.customer_id}','${order.order_date}','${order.items}','${order.sub_total}','${order.tax}','${order.tax_type}','${order.discount}','${order.discount_type}','${order.total}','${order.payment_mode}','${order.paid}')`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async () => {
  try {
    const result = await getAllRecord(`SELECT tbl_order.id as list_id,tbl_order.order_id,tbl_order.invoice_id,tbl_order.customer_id,tbl_order.order_date,tbl_order.items,tbl_order.sub_total,tbl_order.discount,tbl_order.total,tbl_order.payment_mode,tbl_order.paid,tbl_order.delete_status,tbl_customer.id,tbl_customer.name FROM tbl_order INNER JOIN tbl_customer ON tbl_order.customer_id = tbl_customer.id where tbl_order.delete_status = 0`);
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

const getOneRecord = async(query) =>{
  const conn = await getConnection();
  return new Promise(res => {
      conn.get(query, (err, rows) => {
        res(rows);
      });
  });
};

const insertRecord = async(query) =>{
  const conn = await getConnection();
  return new Promise((resolve, reject) => {
      conn.run(query, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
    });
  });
};

module.exports = {
  getCategory,
  addCategory,
  getProduct,
  addProduct,
  getDiscount,
  addDiscount,
  getCustomer,
  addCustomer,
  getInvoiceCount,
  getProductById,
  getDiscountById,
  addOrder,
  getOrder,
};