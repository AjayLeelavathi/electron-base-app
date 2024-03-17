const { updateCategory } = require('../../database/query');
const edit_category_form = document.querySelector("#edit_category_form");
const edit_category_id = document.querySelector("#edit_category_id");
const edit_category_name = document.querySelector("#edit_category_name");
const edit_category_description = document.querySelector("#edit_category_description");

let categorys = [];

edit_category_form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    var validator = $("#edit_category_form").validate({
      rules: {
        edit_category_name: {
          required: true
        },
        edit_category_description: {
          required: true
        },
        edit_category_id:{
          required: true
        },
      },
      messages:{
        edit_category_name: "Please enter category name",
        edit_category_description:"Please enter category description",
      },
    });
    if(validator.form())
    {
      const category = {
      	id: edit_category_id.value,
        name: edit_category_name.value,
        description: edit_category_description.value,
      };
      // const update = await updateCategory(category);
      // edit_category_form.reset();
      // category_name.focus();
    }
  } catch (error) {
    console.log(error);
  }
});