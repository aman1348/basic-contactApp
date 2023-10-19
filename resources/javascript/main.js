const contacts = document.getElementById("contacts");

data = JSON.parse(localStorage.getItem("data"));

let createContact = function (data, id) {
    return `<div class="card mb-0 border-0">
    <div class="card-header bg-white px-5" data-toggle="collapse" data-target="#contactDetails${id}">
        <h5 class="card-title my-0">${data.name}</h5>
        
    </div>
    <div id="contactDetails${id}" class="collapse px-5">
        <div class="card-body py-0">
            <p class="card-text">Email: ${data.email}</p>
            <p class="card-text">Phone: ${data.phone}</p>
            <p class="card-text">Address: ${data.address}</p>
        </div>
        <div class="ml-auto mt-2 mx-0 px-5">
            <!-- Edit Icon -->
            <a href="#" class=" btn btn-outline-primary text-primary mx-2 py-0">
                <i class="fas fa-pencil-alt"></i>
            </a>
            <!-- Delete Icon -->
            <a href="#"  id="del${id}"onclick="deleteContact(this)" class="btn btn-outline-danger text-danger mx-5 py-0">
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>
    </div>
</div>`;
};

function getfirstchar(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] == ' ') continue;
        return str[i].toUpperCase();
    }
}

// render contacts on home page
let renderData = function (data) {
    let Data = data.map((val, index) => {
        return createContact(val, index);
    });
    let currentChar = "";
    let renderData = "";
    Data.forEach((element, index) => {
        if (currentChar === "") {
            console.log("data name: " + data[index].name);
            currentChar = getfirstchar(data[index].name);
            renderData += `
            <div class="card-header bg-white m-0 py-0" id="header${currentChar}>
            <h3 class="card-title my-0 ">${currentChar} </h3>
            </div>
            `;
        }
        else if (/^\d$/.test(getfirstchar(data[index].name))) {
            if (currentChar != "0-9") {
                currentChar = "0-9";
                renderData += `
                <div class="card-header bg-white m-0 py-0" id="header${currentChar}>
                <h3 class="card-title my-0 ">${currentChar} </h3>
                </div>
            `;
            }

        }
        else if (getfirstchar(data[index].name) != currentChar) {
            currentChar = getfirstchar(data[index].name);
            renderData += `
            <div class="card-header bg-white m-0 py-0" id="header${currentChar}">
            <h3 class="card-title my-0 ">${currentChar} </h3>
            </div>
            `;

        }

        renderData = renderData + element;
    });

    return renderData;
};


// delete contact
let deleteContact = function (e) {
    e.parentElement.parentElement.parentElement.remove();
}

contacts.innerHTML = renderData(data);
