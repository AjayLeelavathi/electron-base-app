const { addUser } = require('../../database/query');
const { createPassword } = require('../../plugin/encrypt');
const user_form = document.querySelector("#user_form");

const user_name        = document.querySelector("#user_name");
const email            = document.querySelector("#email");
const password         = document.querySelector("#password");
const confirm_password = document.querySelector("#confirm_password");
const user_role        = document.querySelector("#user_role");

let user = [];

user_form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    var validator = $("#user_form").validate({
      rules: {
        user_name: {
          required: true
        },
        email: {
          required: false
        },
        password: {
          required: true
        },
        confirm_password: {
          required: true,
          equalTo: "#password"
        },
        user_role: {
          required: true
        },
      },
      messages:{
        user_name: "Please enter user name",
        email:"Please enter email name",
        password:"Please enter password",
        confirm_password: {
    			required : 'Please enter confirm password',
    			equalTo : 'Password and Confirm Password is Same',
    		},
        user_role:"Please enter user role",
      },
    });
    if(validator.form())
    {
      const password_value = await createPassword(password.value);
      const user_value = {
        name: user_name.value,
        email: email.value,
        password: password_value,
        user_role: user_role.value,
      };
      const add = await addUser(user_value);
      user_form.reset();
    }
  } catch (error) {
    console.log(error);
  }
});