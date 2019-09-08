//alert("Hello World");
console.log("Hello World"); // 1
loadUserList();

function loadUserList() {
    const requestPromise = fetch("https://jsonplaceholder.typicode.com/users");
    requestPromise.then((response) => {
        response.json().then((json) => {
            console.log(json); // 4
            json.forEach((user) => {
                const userData = {
                    name: user.name.split(" ")[0],
                    surname: user.name.split(" ")[1],
                    age: user.email,
                    nationality: user.address.city,
                };
                addUserRowToTable(userData);
            });
        });
        console.log(response); // 3
    });
    console.log(requestPromise);  // 2
}

function sendFormToTable() {
    const userData = getUserDataFromForm();
    addUserRowToTable(userData);
    clearForm();
}

function getUserDataFromForm() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const age = document.getElementById("age").value;
    const nationality = document.getElementById("nationality").value;
    return {
        name: name,
        surname: surname,
        age: age,
        nationality: nationality,
    };
}

function addUserRowToTable(userData) {
    const trElement = document.createElement("tr");

    const nameTdElement = document.createElement("td");
    nameTdElement.textContent = userData.name;
    trElement.appendChild(nameTdElement);

    const surnameTdElement = document.createElement("td");
    surnameTdElement.textContent = userData.surname;
    trElement.appendChild(surnameTdElement);

    const ageTdElement = document.createElement("td");
    ageTdElement.textContent = userData.age;
    trElement.appendChild(ageTdElement);

    const nationalityTdElement = document.createElement("td");
    nationalityTdElement.textContent = userData.nationality;
    trElement.appendChild(nationalityTdElement);

    //document.getElementsByTagName("table")[0].appendChild(trElement);
    document.getElementById("user-list").appendChild(trElement);
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("age").value = undefined;
    document.getElementById("nationality").value = "";
}
