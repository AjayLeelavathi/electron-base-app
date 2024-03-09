const { addCustomer } = require('../../database/query');
const customer_form = document.querySelector("#customer_form");
const customer_name = document.querySelector("#customer_name");
const customer_address = document.querySelector("#customer_address");
const phone_number = document.querySelector("#customer_phone_number");

let customer = [];

customer_form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    var validator = $("#customer_form").validate({
      rules: {
        customer_name: {
          required: true
        },
        customer_address: {
          required: true
        },
        customer_phone_number: {
          required: true
        },
      },
      messages:{
        customer_name: "Please enter name",
        customer_address:"Please enter address",
        customer_phone_number:"Please enter phone number",
      },
    });
    if(validator.form())
    {
      const customer = {
        name: customer_name.value,
        address: customer_address.value,
        phone_number: phone_number.value,
      };
      const add = await addCustomer(customer);
      customer_form.reset();
    }
  } catch (error) {
    console.log(error);
  }
});