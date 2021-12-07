const list = document.getElementById('book-list');
const form = document.getElementById('book-form')

class Book{
    constructor(title, author, date){
        this.title = title;
        this.author = author;
        this.date = date;
    }
}

class UI {
    addBook(newBook) {
        const tr = document.createElement('tr');
        const now = new Date();
        tr.className = 'collection-item';
        tr.innerHTML = `<td>${newBook.title}</td> <td><a href="${newBook.author}">${newBook.date}</a></td> <td>${now.getDate()}/${now.getMonth()}/${now.getFullYear()}</td> <td><div class="delete-item">X</div></td>`;
        list.appendChild(tr);
        this.clearInputs()
    }
    clearInputs(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('finishDate').value='';
    }
    errorAlert(text){
        const div = document.createElement('div');
        div.className = 'error';
        div.appendChild(document.createTextNode(text));
        const parent = document.querySelector('.inputs');
        parent.insertBefore(div,form);

        setTimeout(function(){
            document.querySelector('.error').remove();
        },2500);
    }
    deleteBook(item){
        if(item.target.classList.contains("delete-item")){
            LocalStorage.remove(item.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
            item.target.parentElement.parentElement.remove();
        }
    }
}

class LocalStorage {
    static getBooksFromStorage(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    };
    static displayStorageBooks(){
        const books = LocalStorage.getBooksFromStorage();
        books.forEach(book => {
            newUI.addBook(book)
        });
    };
    static addBook(){
        const books = LocalStorage.getBooksFromStorage();

        books.push(newBook);

        localStorage.setItem('books',JSON.stringify(books));
    };
    static remove(e){
        console.log('apagar:' + e)
        const books = LocalStorage.getBooksFromStorage();
        books.forEach(function(book, i){
            if(book.title === e){
                console.log('deu certo')
                books.splice(i,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));    
    };
}

const newUI = new UI();

form.addEventListener('submit',function(e){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const dateF = document.getElementById('finishDate').value;

    if(title === '' || author === '' || dateF ===''){
        newUI.errorAlert('Please fill all fields');
    }else{
        newBook = new Book(title, author, dateF);
        newUI.addBook(newBook);
        LocalStorage.addBook();
    }
    e.preventDefault();
})

list.addEventListener('click', function(e){
    newUI.deleteBook(e);
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', LocalStorage.displayStorageBooks());

