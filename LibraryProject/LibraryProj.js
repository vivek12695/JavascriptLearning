class Book {
  constructor(name, status, pages) {
    this.Name = name;
    this.Status = status;
    this.Pages = pages;
  }
}

var userErrorMsg = document.getElementById("errorMsg");
userErrorMsg.innerText = "";

let library = [];

if (localStorage.getItem("library") == null) {
  library = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem("library"));
  library = booksFromStorage;
}

document.getElementById("AddBookButton").onclick = function () {
  var bookName = document.getElementById("bookNameTxtBx").value;
  var read = document.getElementById("ReadChkBx").checked;
  var pages = document.getElementById("pagesTxtBx").value;

  if (bookName.length == 0 || pages.length == 0) {
    return;
  }
  if (library.find((x) => x.Name == bookName)) {
    userErrorMsg.innerText = "User Already Exists";
    return;
  }
  userErrorMsg.innerText = "";
  library.push(new Book(bookName, read, pages));
  localStorage.setItem("library", JSON.stringify(library));
  console.log(library[0].Name);

  RefreshView.call();
};
let RefreshView = function () {
  var bookListContainer = document.getElementById("BookListContainer");
  bookListContainer.innerHTML = "<div></div>";
  // Loop through the user list and create cards
  for (var i = 0; i < library.length; i++) {
    var book = library[i];

    // Create a div for the user card
    var card = document.createElement("div");
    card.classList.add("user-card");

    // Populate the card with user data
    card.innerHTML = `
    <div class="card" style="width: 18rem;margin:5px;">
    <div class="card-body">
    <h5 class="card-title">Name: ${book.Name}</h5>
    <div><p>Pages: ${book.Pages}</p>
                
                <label>Read</label>
                <input type="checkbox" checked="${book.Status}" />
                </div><button class="DeleteBookButton btn btn-danger" >Delete</button>
                </div>
                </div>
            `;
    var button = card.querySelector(".DeleteBookButton");

    button.addEventListener(
      "click",
      (function (indexOfCurrentBook) {
        return function () {
          library.splice(indexOfCurrentBook, 1);
          localStorage.setItem("library", JSON.stringify(library));
          RefreshView.call();
        };
      })(i)
    );
    // Append the card to the container
    bookListContainer.appendChild(card);
  }
};

RefreshView.call();
