const  {getUser} = require('../../database/query');
let lists = [];

function renderLists(tasks) {
  let html_value = "";
  tasks.forEach((t) => {
    let status = t.status ? 'Active' : 'InActive';
    let role   = t.role == 2 ? 'Admin' : 'User';
    let last_login = t.last_login != null  ? t.last_login : '-';
    html_value += `
      <tr>
        <td>`+t.id+`</td>
        <td>`+t.name+`</td>
        <td>`+t.email+`</td>
        <td>`+status+`</td>
        <td>`+role+`</td>
        <td>`+last_login+`</td>
      </tr>`
  });
    $('#user_list tbody').append(html_value);
    $('#user_list').DataTable({
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
	getUserData();
})

async function getUserData() 
{
  lists = await getUser();
  renderLists(lists);
}