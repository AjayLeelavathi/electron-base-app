const  {getProduct} = require('../../database/query');
const list_table    = document.querySelector("#product_list");
let lists = [];

function renderLists(tasks) {
  let html_value = "";
  let count_id = 1;
  tasks.forEach((t) => {
    let qr_code    = t.qr_code == null ? "-" : t.qr_code;
    let tax_amount = t.tax_amount == null ? "-" : t.tax_amount;
    let tax_type   = t.tax_type == 0 ? "-" : t.tax_type == 1 ? "Exclusive" : "Inclusive";
    let status     = t.status == 1 ? "Active" : "In-Active";
    html_value += `
      <tr>
        <td>`+count_id+`</td>
        <td>`+qr_code+`</td>
        <td>`+t.category_name+`</td>
        <td>`+t.name+`</td>
        <td>`+t.price+`</td>
        <td>`+tax_amount+`</td>
        <td>`+tax_type+`</td>
        <td>`+t.stack_out+`</td>
        <td>`+status+`</td>
      </tr>`;
      count_id++;
  });
  $('#product_list tbody').append(html_value);
  $('#product_list').DataTable();
}

window.addEventListener('load', function() 
{
	getProductData();
})

async function getProductData() 
{
  lists = await getProduct();
  renderLists(lists);
}