const { checkUser } = require('../../database/query');
const ipcRenderer = require('electron').ipcRenderer;
const { checkPassword } = require('../../plugin/encrypt');
const login_form  = document.querySelector("#login_form");

const user_name  = document.querySelector("#user_name");
const password   = document.querySelector("#password");



login_form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    var validator = $("#login_form").validate({
      rules: {
        user_name: {
          required: true
        },
        password: {
          required: true
        },
      },
      messages:{
        user_name: "Please enter user name",
        password:"Please enter password",
      },
    });
    if(validator.form())
    {
      const check_user = await checkUser(user_name.value);
      if(check_user.length > 0)
      {
        const check_value = await checkPassword(password.value,check_user[0].password);
        if(check_value)
        {
          ipcRenderer.send('billing_page');
        }
        else{
          alert("Invalid Creditional")
        }
      }
      else{
        alert("Invalid Creditional")
      }
    }
  } catch (error) {
    console.log(error);
  }
});