const  {getCategory,deleteCategory,getCategoryById} = require('../../database/query');
const list_table  = document.querySelector("#category_list");
const ipc = require('electron').ipcRenderer;
let lists = [];

function renderLists(tasks) {
  let html_value = "";
  let count_id = 1;
  tasks.forEach((t) => {
    html_value += `
      <tr>
        <td>`+count_id+`</td>
        <td>`+t.name+`</td>
        <td>`+t.description+`</td>
        <td class='text-center'><a class="btn btn-success me-1 edit_category" data-id=`+t.id+`><i class="fa fa-edit"></i></a></td>
        <td class='text-center'><a class="btn btn-success me-1 delete_category" data-id=`+t.id+`><i class="fa fa-trash"></i></a></td>
      </tr>`;
      count_id++;
  });
  // console.log(html_value);
  $('#category_list tbody').append(html_value);
  $('#category_list').DataTable();
}

window.addEventListener('load', function() 
{
	getCategoryData();
})

async function getCategoryData() 
{
  $("#category_list tbody").empty();
  lists = await getCategory();
  renderLists(lists);
}

async function deleteCategoryData(id)
{
  // let data = await getCategoryById(id);
  // ipc.send('aSynMessage',data);
  // return false;
  let delete_category = await deleteCategory(id);
  getCategoryData();
}

async function editCategoryData(id)
{
  let data = await getCategoryById(id);
  ipc.send('aSynMessage',data);
  return false;
}