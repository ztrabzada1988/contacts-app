// create globall variables
var quickAddBtn = document.getElementById("addButton");
var AddBtn = document.getElementById("Add");
var cancelBtn = document.getElementById("Cancel");
var quickAddFormDiv = document.querySelector('.addContactForm');

// Form Fields
var fullname = document.getElementById("fullname");
var phone = document.getElementById("phone");
var address = document.getElementById("address");
var city = document.getElementById("city");
var email = document.getElementById("email");

// Address Bokk Display
var addBookDiv = document.querySelector(".addbook");

// Create Storage Array
var addressBook = [];

// Event Listners

$(document).ready(function () {

    // When you click on ADD button it should open the form
    $('#addButton').on('click', function () {
        $('.addContactForm').css('display', 'block');
    });

    // When you click on Cancel button it should close the form
    $('#Cancel').on('click', function () {
        $('.addContactForm').css('display', 'none');
    });

    // Add the form elements to address book after Add button on the form is clicked
    // run the addToBook function once Add is clicked
    $('#Add').on('click', addToBook);

    // create a jsonStructure constructor
    function jsonStructure(fullname, phone, address, city, email) {
        this.fullname = fullname;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.email = email;

    }

    // define addToBook function
    function addToBook() {
        // Add the contents of the form to the array & localstorage
        var obj = new jsonStructure(fullname.value, phone.value, address.value, city.value, email.value);

        // push the values to the addressBook array (defined above) and local storage
        addressBook.push(obj);
        // localStorage only stores strings so convert array to string
        localStorage['addbook'] = JSON.stringify(addressBook);
        // Hide the form panel
        $('.addContactForm').css('display', 'none');
        // Clear the form
        clearForm();
        // Update and display all records in the addressbook
        showAddressBook();
    }

    $('.addbook').click(removeEntry);

    // remove entry based on the index value
    function removeEntry(e) {
        if (e.target.classList.contains("delbutton")) {
            var indexId = e.target.getAttribute("data-id");
            // Remove the JSON entry from the array with index num = indexID
            addressBook.splice(indexId, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function clearForm() {
        $('.formFields').val("");
    }


    // define function that shows the address book contacts
    function showAddressBook() {
        // check if the key 'addbook' exists in localStorage or else create it

        // if it exists, load contents from the localStorage and loop > display it
        if (localStorage['addbook'] === undefined) {
            localStorage['addbook'] = "[]"; // can only store string
        } else {
            addressBook = JSON.parse(localStorage['addbook']); // parse = process line by line
            // empty the .addbook contents
            $('.addbook').val('');

            for (var i in addressBook) {
                //construct a string out of your JSON objects (copy from commented out section of .addbook in index.html)
                var contactEntryString = '<div class="entry">';
                contactEntryString += '<div class = "name" ><p>' + addressBook[i].fullname + '</p></div>';
                contactEntryString += '<div class = "email"><p>' + addressBook[i].email + '</p></div>';
                contactEntryString += '<div class = "phone"><p>' + addressBook[i].phone + '</p></div>';
                contactEntryString += '<div class = "address"><p>' + addressBook[i].address + '</p></div>';
                contactEntryString += '<div class = "city"><p>' + addressBook[i].city + '</p></div>';
                contactEntryString += '<div class = "del"><a href = "#" class="delbutton" data-id="' + i + '"> Delete </a></div>';
                contactEntryString += '</div>';

                $('.addbook').append(contactEntryString);
            }
        }
    }

    showAddressBook();

})
