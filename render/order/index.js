const  {getOrder} = require('../../database/query');
let lists = [];

function renderLists(tasks) {
  let html_value = "";
  let count = 1;
  tasks.forEach((t) => {
    var paid_status   = t.paid === 1 ? '<span class="badge bg-success font-size-12 ms-2">Paid</span>' : '<span class="badge bg-warning font-size-12 ms-2">UnPaid</span>';
    var payment_mode  = t.payment_mode === 1 ? 'Cash' : t.payment_mode === 2 ? 'Card': 'UPI';
    let object_value  = JSON.parse(t.items);
    let product_array = object_value.map(obj => obj.product_name);
    html_value += `
      <tr>
        <td>`+count+`</td>
        <td>`+t.invoice_id+`</td>
        <td>`+t.name+`</td>
        <td>`+t.order_date+`</td>
        <td>`+t.discount+`</td>
        <td>`+t.total+`</td>
        <td>`+payment_mode+`</td>
        <td>`+product_array.toString()+`</td>
        <td>`+paid_status+`</td>
        <td><a href="javascript:window.print()" class="btn btn-success me-1"><i class="fa fa-print"></i></a><a href="" class="btn btn-success me-1 ml-1 mr-1"><i class="fas fa-eye"></i></a><a href="" class="btn btn-success me-1 delete_order" data-id="`+t.list_id+`"><i class="fas fa-trash"></i></a></td>
      </tr>`;
      count++;
  });
    $('#invoice_list tbody').append(html_value);
    $('#invoice_list').DataTable({
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excel',
          text: 'Export to Excel',
          filename: 'invoice_details',
          title: 'Custom Title'
        }
      ]
    });
}

async function deleteOrder(id)
{
  const update_data = 
  {
    status: 0,
  };
  let order = await updateOrder(update_data,id);
  // console.log(order);
  // return id;
}

window.addEventListener('load', function() 
{
	getOrderData();
})

async function getOrderData() 
{
  lists = await getOrder();
  renderLists(lists);
}