function handleSearch(event) {
    event.preventDefault();
    const searchButton = document.getElementById('searchButton');
   const searchInput = document.getElementById('searchInput');
    //let filter = document.getElementById("filter");

// grab the filter input and listen for the key up event

searchButton.addEventListener('click', function (event) {


    const searchQuery = searchInput.value;
    passwordList.innerHTML = '';
    axios
        .get(
            "https://crudcrud.com/api/ff64081d82144395bbc6217c84e5bed5/AppointmentData"
        )
        .then((response) => {
            //console.log(response);
            //let result = response.data.includes(textenterd);
            
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
)

}


function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        title: event.target.title.value,
        password: event.target.password.value,
       
    };
    axios
        .post(
            "https://crudcrud.com/api/ff64081d82144395bbc6217c84e5bed5/AppointmentData",
            userDetails
        )
        .then((response) => displayUserOnScreen(response.data))
            
        .catch((error) => console.log(error));

    // Clearing the input fields
    document.getElementById("title").value = "";
    document.getElementById("password").value = "";
    
}
window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(
            "https://crudcrud.com/api/ff64081d82144395bbc6217c84e5bed5/AppointmentData"
        )
        .then((response) => {
            //console.log(response);

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
function deleteTodo() {
    axios
        .delete("https://crudcrud.com/api/ff64081d82144395bbc6217c84e5bed5/AppointmentData/67ac80c3d5e8e603e8a70785")
        .then((resolve) => console.log(resolve.data))
        .catch((err) => console.log(err));
}
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
        localStorage.removeItem(userDetails.password);
    });

    editBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        localStorage.removeItem(userDetails.password);
        document.getElementById("title").value = userDetails.title;
        document.getElementById("password").value = userDetails.password;
        
    });
    
}


