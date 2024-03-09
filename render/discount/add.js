const { getProduct,addDiscount } = require('../../database/query');
const discount_form = document.querySelector("#discount_form");

const discount_name   = document.querySelector("#discount_name");
const product_id      = document.querySelector("#product_id");
const discount_type   = document.querySelector("#discount_type");
const discount_amount = document.querySelector("#discount_amount");
const status          = document.querySelector("#status");

let product_list = [];
window.addEventListener('load', function() 
{
  loadProductData();
})

discount_form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    var validator = $("#discount_form").validate({
      rules: {
        discount_name: {
          required: true
        },
        product_id: {
          required: true
        },
        discount_type: {
          required: true
        },
        discount_amount:{
          required: true
        },
        status: {
          required: true
        },
      },
      messages:{
        discount_name: "Please enter discount name",
        product_id:"Please Select Product Name",
        discount_type:"Please enter product price",
        status:"Please enter product quantity",
        discount_amount:"Please enter product quantity",
      },
    });
    if(validator.form())
    {
      const discount = {
        name: discount_name.value,
        product_id: product_id.value,
        discount_type: discount_type.value,
        discount_value: discount_amount.value,
        status: status.value,
      };
      const add = await addDiscount(discount);
      discount_form.reset();
    }
  } catch (error) {
    console.log(error);
  }
});

function renderProductList(lists)
{
  let html_value = "";
  lists.forEach((t) => {
    html_value += `<option value=`+t.id+`>`+t.name+`</option>`;
  });
  $('#product_id').append(html_value);

}

async function loadProductData() 
{
  product_list = await getProduct();
  renderProductList(product_list);
}