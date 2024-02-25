const  {getCategory} = require('../../database/query');
const list_table     = document.querySelector("#category_list");
let lists = [];

function renderLists(tasks) {
  let html_value = "";
  tasks.forEach((t) => {
    html_value += `
      <tr>
        <td>`+t.id+`</td>
        <td>`+t.name+`</td>
        <td>`+t.description+`</td>
      </tr>`
  });
    $('#category_list tbody').append(html_value);
    $('#category_list').DataTable();
}

window.addEventListener('load', function() 
{
	getCategoryData();
})

async function getCategoryData() 
{
  lists = await getCategory();
  renderLists(lists);
}