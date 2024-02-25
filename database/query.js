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

const getAllRecord = async(query) =>{
  const conn = await getConnection();
  return new Promise(res => {
      conn.all(query, (err, rows) => {
        res(rows);
      });
  });
};

const insertRecord = async(query) =>{
  console.log(query);
  const conn = await getConnection();
  conn.run(query);
  return true;
};

module.exports = {
  getCategory,
  addCategory
};