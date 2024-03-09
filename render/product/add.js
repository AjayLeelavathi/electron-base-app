const { getCategory,addProduct } = require('../../database/query');
const product_form = document.querySelector("#product_form");

const category_id  = document.querySelector("#category_id");
const product_name = document.querySelector("#product_name");
const price        = document.querySelector("#price");
const description  = document.querySelector("#description");
const tax_amount   = document.querySelector("#tax_amount");
const tax_type     = document.querySelector("#tax_type");

let product = [];
let category_list = [];
window.addEventListener('load', function() 
{
  loadCategoryData();
})

product_form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    var validator = $("#product_form").validate({
      rules: {
        category_id: {
          required: true
        },
        product_name: {
          required: true
        },
        price: {
          required: true
        },
      },
      messages:{
        category_id: "Please Select category name",
        product_name:"Please enter product name",
        price:"Please enter product price",
      },
    });
    if(validator.form())
    {
      var product_perfix = 'PR-' 
      var qr_code_number = product_perfix+Math.floor(Math.random() * 90000) + 10000;
      const product = {
        category_id: category_id.value,
        qr_code: qr_code_number,
        name: product_name.value,
        description: description.value,
        price: price.value,
        tax_amount: tax_amount.value,
        tax_type: tax_type.value,
      };
      const add = await addProduct(product);
      product_form.reset();
    }
  } catch (error) {
    console.log(error);
  }
});

function renderCategoryList(lists)
{
  let html_value = "";
  lists.forEach((t) => {
    html_value += `<option value=`+t.id+`>`+t.name+`</option>`;
  });
  $('#category_id').append(html_value);

}

async function loadCategoryData() 
{
  category_list = await getCategory();
  renderCategoryList(category_list);
}