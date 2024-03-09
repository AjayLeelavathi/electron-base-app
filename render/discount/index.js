const  {getDiscount} = require('../../database/query');
let lists = [];

function renderLists(tasks) {
  let html_value = "";
  tasks.forEach((t) => {
    let discount_type = t.discount_type == 1 ? "Rate" : "percentage";
    let status = t.status == 1 ? "Active" : "InActive";
    html_value += `
      <tr>
        <td>`+t.id+`</td>
        <td>`+t.name+`</td>
        <td>`+t.product_name+`</td>
        <td>`+discount_type+`</td>
        <td>`+t.discount_value+`</td>
        <td>`+status+`</td>
      </tr>`
  });
  // <td><a href="" class="btn btn-success me-1 ml-1 mr-1"><i class="fas fa-eye"></i></a></td>
    $('#discount_list tbody').append(html_value);
    $('#discount_list').DataTable({
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
	getDiscountData();
})

async function getDiscountData() 
{
  lists = await getDiscount();
  renderLists(lists);
}