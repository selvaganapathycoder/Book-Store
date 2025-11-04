 class Book {
      constructor(name, author, isbn) {
        this.name = name;
        this.author = author;
        this.isbn = isbn;
      }
    }

    class Show extends Book {
      constructor(name, author, isbn) {
        super(name, author, isbn);
      }

      addBookToList() {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${this.name}</td>
          <td>${this.author}</td>
          <td>${this.isbn}</td>
          <td><button class="delete-btn">Delete</button></td>
        `;
        list.appendChild(row);
      }
    }

    // Save books to localStorage
    function saveBooks(books) {
      localStorage.setItem("books", JSON.stringify(books));
    }

    // Get books from localStorage
    function getBooks() {
      return JSON.parse(localStorage.getItem("books")) || [];
    }

    // Display saved books on load
    window.addEventListener("DOMContentLoaded", () => {
      const savedBooks = getBooks();
      savedBooks.forEach(book => {
        const ui = new Show(book.name, book.author, book.isbn);
        ui.addBookToList();
      });
    });

    document.querySelector("#add-book").addEventListener("click", () => {
      const name = document.querySelector("#book-name").value.trim();
      const author = document.querySelector("#book-author").value.trim();
      const isbn = document.querySelector("#book-isbn").value.trim();

      if (!name || !author || !isbn) {
        alert("Please fill all fields!");
        return;
      }

      const ui = new Show(name, author, isbn);
      ui.addBookToList();

      const books = getBooks();
      books.push({ name, author, isbn });
      saveBooks(books);

      document.querySelector("#book-name").value = "";
      document.querySelector("#book-author").value = "";
      document.querySelector("#book-isbn").value = "";
    });

    document.querySelector("#book-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const row = e.target.parentElement.parentElement;
        const isbn = row.children[2].textContent;

        let books = getBooks();
        books = books.filter(book => book.isbn !== isbn);
        saveBooks(books);

        row.remove();
      }
    });
 