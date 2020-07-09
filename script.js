const tableK = "contact-table";

let cntTable;

// Demo table data for initial startup
let demo = {
    '865697397': {
        'fname': 'Domantas',
        'lname': 'Bartusevicius',
        'date': '1998-10-12',
        'email': 'domantas.bartusevicius@gmail.com',
        'address': 'USA NY Broadway st. 125'
    },
    '865697457': {
        'fname': 'Karolis',
        'lname': 'Eidukevicius',
        'date': '1998-07-27',
        'email': 'karolisgood13@gmail.com',
        'address': 'UK London City Garden Row 14'
    }
};

let newSubmitBtn = document.getElementById('newSubmit');

//Enabling and cleaning up add contact modal once ContactAdd button is pressed
function addToggle() {
    document.getElementById('addContactModal').className = 'enable-modal';
    document.getElementById('backdrop').className = 'enable-modal';
    document.getElementById("modal-title").innerHTML = 'Add new contact';

    let nFirstName = document.getElementById('newFirstname');
    let nLastName = document.getElementById('newLastname');
    let nDate = document.getElementById('newDate');
    let nPhone = document.getElementById('newPhone');
    let nEmail = document.getElementById('newEmail');
    let nAddress = document.getElementById('newAddress');

    nFirstName.value = '';
    nLastName.value = '';
    nDate.value = '';
    nPhone.value = '';
    nEmail.value = '';
    nAddress.value = '';
}

//Disabling contact modal once newClose button is pressed
function closeModal() {
    document.getElementById('addContactModal').className = 'disable-modal';
    document.getElementById('backdrop').className = 'disable-modal';
    KeyValueToggle(false);
}

// Email and Phone - key value disabling once user edits contact info
function KeyValueToggle(bool) {
    document.getElementById('newPhone').disabled = bool;
    document.getElementById('newEmail').disabled = bool;
}

// Contact table draw and update
function updateTable() {
    let tableKeys = Object.keys(cntTable);
    let tableContainer = document.getElementById('TableContainer');
    let tableBody = document.getElementById('ContactBody');
    tableContainer.removeChild(tableBody);

    let tableBodyNew = document.createElement('span');
    tableBodyNew.id = 'ContactBody';
    tableContainer.appendChild(tableBodyNew);

    // Cycle through available data and draw rows
    for (let i = 0; i < tableKeys.length; i++) {
        let cRow = document.createElement('div');
        let cFNameCol = document.createElement('div');
        let cLNameCol = document.createElement('div');
        let cDateCol = document.createElement('div');
        let cPhoneCol = document.createElement('div');
        let cEmailCol = document.createElement('div');
        let cAddressCol = document.createElement('div');
        let cEditBtn = document.createElement('div');
        let cDeleteBtn = document.createElement('div');

        cRow.className = 'contact-row';
        cFNameCol.className = 'contact-column contact-fname';
        cLNameCol.className = 'contact-column contact-lname';
        cDateCol.className = 'contact-column contact-date';
        cPhoneCol.className = 'contact-column contact-phone';
        cEmailCol.className = 'contact-column contact-email';
        cAddressCol.className = 'contact-column contact-address';
        cEditBtn.className = 'contact-column contact-edit';
        cDeleteBtn.className = 'contact-column contact-delete';

        cPhoneCol.innerHTML = tableKeys[i];
        cFNameCol.innerHTML = cntTable[tableKeys[i]].fname;
        cLNameCol.innerHTML = cntTable[tableKeys[i]].lname;
        cDateCol.innerHTML = cntTable[tableKeys[i]].date;
        cEmailCol.innerHTML = cntTable[tableKeys[i]].email;
        cAddressCol.innerHTML = cntTable[tableKeys[i]].address;

        cEditBtn.innerHTML = '<i class="fas fa-edit"></i>';
        cDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

        cRow.appendChild(cFNameCol);
        cRow.appendChild(cLNameCol);
        cRow.appendChild(cDateCol);
        cRow.appendChild(cPhoneCol);
        cRow.appendChild(cEmailCol);
        cRow.appendChild(cAddressCol);
        cRow.appendChild(cEditBtn);
        cRow.appendChild(cDeleteBtn);
        tableBodyNew.appendChild(cRow);
    }

    // Add contact modal data parse and validation once submit is pressed
    newSubmitBtn.addEventListener("click", function () {
        let nFirstName = document.getElementById('newFirstname').value.trim();
        let nLastName = document.getElementById('newLastname').value.trim();
        let nDate = document.getElementById('newDate').value.trim();
        let nPhone = document.getElementById('newPhone').value.trim();
        let nEmail = document.getElementById('newEmail').value.trim();
        let nAddress = document.getElementById('newAddress').value.trim();

        let nPhoneCheck = false;
        let nEmailCheck = false;

        if (nFirstName !== '' && nLastName !== '' && nDate !== '' && nPhone !== '' && nEmail !== '') {
            // Checking if new entry has no data with matching email or phone
            if (document.getElementById('newPhone').disabled === false) {
                for (let i = 0; i < tableKeys.length; i++) {
                    if (nEmail === cntTable[tableKeys[i]].email)
                        nEmailCheck = true;
                    else if (nPhone === tableKeys[i])
                        nPhoneCheck = true;
                }
            }
            if (nEmailCheck === true) {
                alert("This email is already associated with another contact. Please correct the info and try again.")
            }
            else if (nPhoneCheck === true) {
                alert("This phone number is already associated with another contact. Please correct the info and try again.")
            }
            else {
                let newContact = {};
                cntTable[nPhone] = {
                    'fname': nFirstName,
                    'lname': nLastName,
                    'date': nDate,
                    'email': nEmail,
                    'address': nAddress
                }
                localStorage.setItem(tableK, JSON.stringify(cntTable));
                closeModal();
                updateTable();
            }
        }
    });

    let editBtns = document.getElementsByClassName('contact-edit');
    let deleteBtns = document.getElementsByClassName('contact-delete');

    // Adding functionality to edit buttons, prefilling modal with stored data
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', ($event) => {
            let fnameToEdit = editBtns[i].parentElement.children[0].innerText;
            let lnameToEdit = editBtns[i].parentElement.children[1].innerText;
            let phoneToEdit = editBtns[i].parentElement.children[3].innerText;
            let contactToEdit = cntTable[phoneToEdit];

            let nFirstName = document.getElementById('newFirstname');
            let nLastName = document.getElementById('newLastname');
            let nDate = document.getElementById('newDate');
            let nPhone = document.getElementById('newPhone');
            let nEmail = document.getElementById('newEmail');
            let nAddress = document.getElementById('newAddress');

            document.getElementById("modal-title").innerHTML = 'Edit ' + fnameToEdit + ' ' + lnameToEdit + ' ' + ' info'

            KeyValueToggle(true);

            document.getElementById('addContactModal').className = 'enable-modal';
            document.getElementById('backdrop').className = 'enable-modal';

            nFirstName.value = contactToEdit.fname;
            nLastName.value = contactToEdit.lname;
            nDate.value = contactToEdit.date;
            nPhone.value = phoneToEdit;
            nEmail.value = contactToEdit.email;
            nAddress.value = contactToEdit.address;
        })
    }

    // Adding functionality to delete buttons
    for (let i = 0; i < deleteBtns.length; i++)
        deleteBtns[i].addEventListener('click', ($event) => {
            let contactFName = deleteBtns[i].parentElement.children[0].innerText;
            let contactLName = deleteBtns[i].parentElement.children[1].innerText;
            let phoneToDelete = deleteBtns[i].parentElement.children[3].innerText;
            let confirmAlert = window.confirm('Are you sure you want to delete ' + contactFName + ' ' + contactLName + ' ?');
            if (confirmAlert)
                deleteContact(phoneToDelete);
        })
}

// Delete function that cycles through data and creates a copy without the deleted entry
function deleteContact(phone) {
    let tmpTable = {};
    let tableKeys = Object.keys(cntTable);
    for (let i = 0; i < tableKeys.length; i++) {
        if (phone !== tableKeys[i]) {
            tmpTable[tableKeys[i]] = cntTable[tableKeys[i]];
        }
    }
    cntTable = tmpTable;
    localStorage.setItem(tableK, JSON.stringify(cntTable));
    updateTable();
}

// Load function used to parse data from localStorage
function loadTable() {
    if (localStorage.getItem(tableK)) {
        cntTable = JSON.parse(localStorage.getItem(tableK));
    } else {
            cntTable = demo;
            localStorage.setItem(tableK, JSON.stringify(cntTable));
    }
    updateTable();
}

loadTable();