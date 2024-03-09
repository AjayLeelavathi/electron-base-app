const  {getCustomer} = require('../../database/query');
const list_table     = document.querySelector("#customer_list");
let lists = [];

function renderLists(tasks) {
  let html_value = "";
  tasks.forEach((t) => {
    let order_count = t.order_count ? t.order_count : '-';
    let status = t.status ? 'Active' : 'InActive';
    html_value += `
      <tr>
        <td>`+t.id+`</td>
        <td>`+t.name+`</td>
        <td>`+t.address+`</td>
        <td>`+t.phone_number+`</td>
        <td>`+order_count+`</td>
        <td>`+status+`</td>
      </tr>`
  });
    $('#customer_list tbody').append(html_value);
    $('#customer_list').DataTable({
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excel',
          text: 'Export to Excel',
          filename: 'customer_details',
          title: 'Custom Title'
        }
      ]
    });
}

window.addEventListener('load', function() 
{
	getCustomerData();
})

async function getCustomerData() 
{
  lists = await getCustomer();
  renderLists(lists);
}