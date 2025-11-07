 class Book {
      constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
      }
    }

    class BookStore {
      constructor() {
        this.bookList = document.getElementById('bookList');
        this.alertBox = document.getElementById('alertBox');
        this.books = JSON.parse(localStorage.getItem('books')) || [];
        this.renderBooks();
      }

      showAlert(msg, type = 'info') {
        this.alertBox.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
        setTimeout(() => this.alertBox.innerHTML = '', 2000);
      }

      addBook(book) {
        this.books.push(book);
        this.saveBooks();
        this.renderBooks();
        this.showAlert(' Book added!', 'success');
      }

      deleteBook(isbn) {
        this.books = this.books.filter(b => b.isbn !== isbn);
        this.saveBooks();
        this.renderBooks();
        this.showAlert(' Book removed!', 'warning');
      }

      clearAll() {
        this.books = [];
        this.saveBooks();
        this.renderBooks();
        this.showAlert(' All books cleared!', 'secondary');
      }

      renderBooks() {
        this.bookList.innerHTML = this.books.map(b => `
          <tr>
            <td>${b.title}</td>
            <td>${b.author}</td>
            <td>${b.isbn}</td>
            <td><button class="btn btn-sm btn-danger delete" data-id="${b.isbn}">X</button></td>
          </tr>
        `).join('');
      }

      saveBooks() {
        localStorage.setItem('books', JSON.stringify(this.books));
      }
    }

    const store = new BookStore();

    document.getElementById('bookForm').addEventListener('submit', e => {
      e.preventDefault();
      const title = titleInput.value.trim();
      const author = authorInput.value.trim();
      const isbn = isbnInput.value.trim();
      if (!title || !author || !isbn) return store.showAlert(' Please fill all fields', 'danger');

      const book = new Book(title, author, isbn);
      store.addBook(book);
      e.target.reset();
    });

    document.getElementById('bookList').addEventListener('click', e => {
      if (e.target.classList.contains('delete')) {
        const isbn = e.target.dataset.id;
        store.deleteBook(isbn);
      }
    });

    document.getElementById('clearAll').addEventListener('click', () => store.clearAll());

    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const isbnInput = document.getElementById('isbn');
 
