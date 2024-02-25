const { addCategory } = require('../../database/query');
const category_form = document.querySelector("#category_form");
const category_name = document.querySelector("#category_name");
const category_description = document.querySelector("#category_description");

let categorys = [];

category_form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    var validator = $("#category_form").validate({
      rules: {
        category_name: {
          required: true
        },
        category_description: {
          required: true
        },
      },
      messages:{
        category_name: "Please enter category name",
        category_description:"Please enter category description",
      },
    });
    if(validator.form())
    {
      const category = {
        name: category_name.value,
        description: category_description.value,
      };
      const add = await addCategory(category);
      category_form.reset();
      // category_name.focus();
    }
  } catch (error) {
    console.log(error);
  }
});