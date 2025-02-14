let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
console.log(contacts);
displayContacts();

function addContact(event) {
  //   console.log(event);
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  console.log({ name, email, phone });
  contacts.push({ name, email, phone });
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

function displayContacts() {
  let list = document.getElementById("contactList");
  list.innerHTML = "";
  contacts.forEach((contact, index) => {
    list.innerHTML += `
                    <div class="contact-item">
                        <div>
                            Name: ${contact.name} <br>
                            Email: ${contact.email} <br>
                            Contact: ${contact.phone}
                        </div>
                        <div>
                            <button onclick="editContact(${index})">Edit</button>
                            <button onclick="deleteContact(${index})">Delete</button>
                        </div>
                    </div>
                `;
  });
}

function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
}

function editContact(index) {
  let contact = contacts[index];
  document.getElementById("name").value = contact.name;
  document.getElementById("email").value = contact.email;
  document.getElementById("phone").value = contact.phone;
  deleteContact(index);
}
