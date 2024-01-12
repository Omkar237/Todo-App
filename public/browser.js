function Template(item){
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data-id="${item._id}"class="delete-me btn btn-danger btn-sm">Delete</button>
  </div>
</li>`
}


//initialPageLoad
let ourHTML = items.map(function(item){
  return Template(item)
}).join("")
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)

//create Feature
let createField = document.getElementById("create-field")
document.getElementById("create-form").addEventListener("submit", function(e){
  e.preventDefault()
  axios.post("/create-item", {text: createField.value}).then(function(response){
    document.getElementById("item-list").insertAdjacentHTML("beforeend",Template(response.data))
    createField.value = ""
    createField.focus()
    }).catch(function(){
    console.log("Something happend try later");
  })

})

document.addEventListener('click', function(e){
  //delete item
  //update
  if(e.target.classList.contains("edit-me")){
    let userText = prompt("Enter new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
   if(userText){
    axios.post('/update-item', {text: userText, id: e.target.getAttribute("data-id")}).then(function(){
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userText;
    }).catch(function(){
      console.log("Something error happen try after minute");
    })
   }
  }

  if(e.target.classList.contains("delete-me")){
    if(confirm("Do you really want to delete this???")){
      axios.post("/delete-item", {id: e.target.getAttribute("data-id")}).then(function(){
        e.target.parentElement.parentElement.remove()
      }).catch(function() {
        console.log("Something happend");
      })
    }
  }
})

