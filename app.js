// Book constructor
function Book(title, author, isbn, burrower,date) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.burrower = burrower;
    this.date = date;

}



// UI constructor
function UI() { }

UI.prototype.addBookToList = function (book) {

    const list = document.getElementById('book-list');
    // create tr element

    const row = document.createElement('tr');

    // insert columns

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td>${book.burrower}</td>
    <td>${book.date}</td>
    <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);

}

// Show Alerts

UI.prototype.showAlert = function (message, className) {
    // create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    // add text

    div.appendChild(document.createTextNode(message));

    // get a parent

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // timour after 3 sec

    setTimeout(function () {
        document.querySelector('.alert').remove();

    }, 3000);
}

// delete book
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();

    }
}

//    Clear Fields
UI.prototype.clearFields = function () {

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('burrow').value = '';
    document.getElementById('date').value = '';


}





// Event listeners
document.getElementById('book-form').addEventListener('submit',
    function (e) {

        // get form values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;
            burrower = document.getElementById('burrow').value;
            date = document.getElementById('date').value;


        // instantiate book
        const book = new Book(title, author, isbn, burrower,date);

        // instantiate UI

        const ui = new UI();
        // Validation

        if (title == '' || author == '' || isbn == '' || burrower ==''|| date == '') {
            // Error Alert

            ui.showAlert('Please Fill In all the Fields', 'error')



        } else {
            ui.addBookToList(book);
            ui.showAlert('Book Added!', 'success')

            ui.clearFields();

        }


        e.preventDefault();
    });


// Event Listeners for Delete
document.getElementById('book-list').addEventListener('click', function (e) {

    const ui = new UI();
    ui.deleteBook(e.target);
    // show delete msg
    ui.showAlert('Book Removed!', 'success');




    e.preventDefault();

});