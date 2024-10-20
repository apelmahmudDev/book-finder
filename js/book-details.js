// DOM elements
const bookCoverEl = document.getElementById("book-cover");
const bookTitleEl = document.getElementById("book-title");
const bookAuthorEl = document.getElementById("book-author");
const bookGenreEl = document.getElementById("book-genre");
const bookLanguagesEl = document.getElementById("book-languages");
const bookDownloadEl = document.getElementById("book-download");
const bookDescriptionEl = document.getElementById("book-description");
const bookIdEl = document.getElementById("book-id");
const mediaTypeEl = document.getElementById("media-type");
const copyrightEl = document.getElementById("copyright");
const bookshelvesEl = document.getElementById("bookshelves");

// Retrieve book data from localStorage
function getBookFromStorage() {
	const bookData = localStorage.getItem("selectedBook");
	return bookData ? JSON.parse(bookData) : null;
}

// Display book details on the page
function displayBookDetails(book) {
	bookCoverEl.src = book.formats["image/jpeg"];
	bookTitleEl.textContent = book.title;
	bookAuthorEl.textContent = `Author: ${book.authors.map((author) => author.name).join(", ")}`;
	bookGenreEl.textContent = `Genre: ${book.subjects[0] || "N/A"}`;
	bookLanguagesEl.textContent = `Languages: ${book.languages.join(", ")}`;
	bookDownloadEl.textContent = `Download Count: ${book.download_count}`;
	bookDescriptionEl.textContent = book.description || "No description available.";
	bookIdEl.textContent = `ID: #${book.id}`;
	mediaTypeEl.textContent = `Media Type: ${book.media_type}`;
	copyrightEl.textContent = `Copyright: ${book.copyright ? "Yes" : "No"}`;
	bookshelvesEl.textContent = `Bookshelves: ${book.bookshelves.join(", ")}`;
}

// Retrieve book from localStorage and display its details
const book = getBookFromStorage();
if (book) {
	displayBookDetails(book);
} else {
	document.body.innerHTML = "<p>Book details not found.</p>";
}
