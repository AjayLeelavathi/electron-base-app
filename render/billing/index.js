const  {getProduct,getInvoiceCount,getProductById,addOrder,getCustomer,addCustomer,getDiscountById} = require('../../database/query');
const invoice_id_1  = document.querySelector(".invoice_id_1");
const invoice_id_2  = document.querySelector(".invoice_id_2");
const order_no      = document.querySelector(".order_no");
const invoice_date  = document.querySelector(".invoice_date");
let lists = [];
let count = 0;
let product_details = [];
let product_array = [];
let customer_list = [];
let invoice_count = 0;
let initial_value = "";
let order_name    = "";
let invoice_name  = "";
let today = new Date().toISOString().slice(0, 10);
let customer_id = 0;

function renderLists(tasks) {
  let html_value = "";
  tasks.forEach((t) => {
    html_value += `
      	<div class="col-md-3 product-container">
            <div class="product-div">
                <div class="card">
                    <div class="card-body">
                        <div class="img-div">
                           	<img src="../../assets/image/product-image/sample.jpg" class="img-fluid">
                        </div>
                        <div class="product-footer">
                            <div class="div-1">
                                <p class="product-name">`+t.name+`</p>
                                <p class="product-price">&#8377;`+t.price+`</p>
                            </div>
                            <div class="div-2">
                               	<p class="product-sell">`+t.quantity+`</p>
                                <p class="product-add"><a href="" class="product_add_btn" data-product-id="`+t.id+`">Add +</a></p>
                            </div>
                        </div>
                    </div>
            	</div>
            </div>
        </div>`
  });
    $('#product-list-table').append(html_value);
}

async function addProduct(product_id)
{
  var product_details = await getProductById(product_id);
  var discount_details = await getDiscountById(product_id);
  var already_exit  = false;
  var exit_id_count = 0;
  var discount = 0;
  if(discount_details.length > 0)
  {
    if(discount_details[0].discount_type == 2)
    {
      discount = parseInt(discount_details[0].rate);
    }
    else if(discount_details[0].discount_type == 1)
    {
      discount = parseInt(discount_details[0].percentage)/100*product_details.price;
    }
  }
  if(product_array.length != 0)
  {
    for(var i = 0; i < product_array.length; i++) 
    {
      if(product_array[i].id === product_id) 
      {
        exit_id_count = i;
        already_exit  = true;
      }
    }
  }
  if(already_exit)
  {
    product_array[exit_id_count].quantity = product_array[exit_id_count].quantity+1;
    product_array[exit_id_count].discount_value = product_array[exit_id_count].discount_value+discount;
  }
  else
  {
    product_array.push({"id": product_details.id, "product_name": product_details.name, "price": product_details.price,"quantity":1,"discount_display":"20%","discount_value":discount});
  }
  
  let count = 1;
  let sub_total = 0;
  let total = 0;
  let total_discount = 0;
  let html_value = "";
  $("#invoice_view_body").empty();
  $('#sub_total_id').empty();
  // $('#discount_id').empty();
  $('#total_id').empty();
    product_array.forEach((t) => {
      total_discount = t.discount_value+total_discount;

      var list_discount = 0;
      var price = t.price*t.quantity-t.discount_value;
      sub_total = sub_total+price;
      total     = sub_total;
      html_value += `
        <tr>
          <th scope="row">`+count+`</th>
          <td>
            <div>
              <h5 class="text-truncate font-size-14 mb-1">`+t.product_name+`</h5>
            </div>
          </td>
          <td>&#8377; `+t.price+`</td>
          <td>`+t.quantity+`</td>
          <td>`+t.discount_value+`</td>
          <td class="text-end">&#8377; `+price+`</td>
        </tr>`;
        count++;
    });
    $('#invoice_view_body').append(html_value);
    $('#sub_total_id').append(sub_total);
    // $('#discount_id').append(total_discount);
    $('#total_id').append(total);
}

async function saveOrder()
{
  let sub_total = $('#sub_total_id').text();
  let total     = $('#total_id').text();
  customer_id   = $('#customer_list :selected').val();
  if(product_array.length > 0)
  {
    if($('#new_user_check').is(':checked'))
    {
      let customer_name = $("#customer_name").val();
      let customer_phone_number = $("#customer_phone_number").val();
      let customer_address = $("#customer_address").val();
      const customer = {
        name: customer_name,
        address: customer_address,
        phone_number: customer_phone_number,
      };
      const customer_id = await addCustomer(customer);
      if(customer_id != "")
      {
        const order_data = 
        {
          order_id: order_name,
          invoice_id: invoice_name,
          customer_id:parseInt(customer_id),
          order_date: today,
          items: JSON.stringify(product_array),
          sub_total: sub_total,
          discount: 0,
          total: total,
          payment_mode: 1,
          status: 1,
          create_at: today,
        };
        let result = await addOrder(order_data);
        if(result)
        {
          location.reload();
        }
      }
    }
    else
    {
      if(customer_id != "")
      {
        const order_data = {
          order_id: order_name,
          invoice_id: invoice_name,
          customer_id:parseInt(customer_id),
          order_date: today,
          items: JSON.stringify(product_array),
          sub_total: sub_total,
          discount: 0,
          total: total,
          payment_mode: 1,
          status: 1,
          create_at: today,
        };
        let result = await addOrder(order_data);
        if(result)
        {
          location.reload();
        }
      }
    }
  }
}

async function renderInvoiceDetail(count_val)
{
  invoice_count = count_val+1;
  initial_value = "000"+invoice_count;
  order_name    = "On-"+initial_value;
  invoice_name  = "In-"+initial_value;

  invoice_id_1.innerHTML = invoice_name;
  invoice_id_2.innerHTML = invoice_name;
  order_no.innerHTML = order_name;
  invoice_date.innerHTML = today;
  customer_list = await getCustomer();
  let html_value = "";
  html_value+= `<option value="">Select Customer</option>`
  customer_list.forEach((t) => {
    html_value += `
      <option value="`+t.id+`">`+t.name+`</option>`;
  })
  $("#customer_list").append(html_value);
}

window.addEventListener('load', function() 
{
	getProductData();
})
async function getProductData() 
{
  lists = await getProduct();
  count = await getInvoiceCount();
  renderLists(lists);
  renderInvoiceDetail(count[0].invoice_count);
}