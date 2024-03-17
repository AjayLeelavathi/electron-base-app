const  {getCustomer,deleteCustomer} = require('../../database/query');
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
        <td class='text-center'><a class="btn btn-success me-1 delete_customer" data-id=`+t.id+`><i class="fa fa-trash"></i></a></td>
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
  $("#customer_list tbody").empty();
  lists = await getCustomer();
  renderLists(lists);
}

async function deleteCustomerData(id) 
{
  let delete_customer = await deleteCustomer(id);
  getCustomerData();
}