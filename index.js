let userId =null;
function handleSearch(event) {
    event.preventDefault();
   const searchQuery = event.target.search.value;

    axios
        .get(
            "https://crudcrud.com/api/c27778a901994b60badb7f05322d12a8/PasswordKeeperData/"
        )
        .then((response) => {
            const userList = document.querySelector("ul");
            userList.innerHTML="";
            
            const filteredPasswords = response.data.filter(function(item) {
                return item.title.includes(searchQuery);
              });
            for(var i=0; i<filteredPasswords.length; i++){
               // if(filteredPasswords[i].includes(searchQuery)){
                displayUserOnScreen(filteredPasswords[i])
                //console.group(response.data[i])
            }
        })
        .catch((error) => console.log(error));

        

    


}


function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        title: event.target.title.value,
        password: event.target.password.value,
       
    };

    if(userId==null){
    axios
        .post(
            "https://crudcrud.com/api/c27778a901994b60badb7f05322d12a8/PasswordKeeperData",
            userDetails
        )
        .then((response) => displayUserOnScreen(response.data))
            
        .catch((error) => console.log(error));
    }
    else{
        axios
        .put("https://crudcrud.com/api/c27778a901994b60badb7f05322d12a8/PasswordKeeperData/"+userId,userDetails)
        .then((resolve) => console.log(resolve.data))
        .catch((err) => console.log(err));
        userId=null;
    }

    // Clearing the input fields
    document.getElementById("title").value = "";
    document.getElementById("password").value = "";

    
}
window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(
            "https://crudcrud.com/api/c27778a901994b60badb7f05322d12a8/PasswordKeeperData"
        )
        .then((response) => {
            console.log(response);

            for(var i=0; i<response.data.length; i++){
                displayUserOnScreen(response.data[i])
                //console.group(response.data[i])
            }
        })
        .catch((error) => console.log(error));

    // Clearing the input fields
    //document.getElementById("title").value = "";
    //document.getElementById("password").value = "";
    
})


function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
        document.createTextNode(
            `${userDetails.title} - ${userDetails.password}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    deleteBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        //localStorage.removeItem(userDetails.password);
        
           axios
                .delete("https://crudcrud.com/api/c27778a901994b60badb7f05322d12a8/PasswordKeeperData/"+userDetails._id)
                .then((resolve) => console.log(resolve.data))
                .catch((err) => console.log(err));
    });

    editBtn.addEventListener("click", function (event) {
        //userList.removeChild(event.target.parentElement);
        //localStorage.removeItem(userDetails.password);
        document.getElementById("title").value = userDetails.title;
        document.getElementById("password").value = userDetails.password;
        userId=userDetails._id;
    
        
            
    
    });
    
}


