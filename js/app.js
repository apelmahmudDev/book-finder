// Variables Declaration
let currentPage = 1;
let selectedGenre = "";
let searchQuery = "";
let totalBooksCount = 0;
let debounceTimeout;

// DOM Elements
const pagination = document.getElementById("pagination");
const genreFilter = document.getElementById("genre-filter");
const searchInput = document.getElementById("search-input");
const loader = document.getElementById("loader");
const resetBtn = document.getElementById("reset-button");
const maxVisibleButtons = 4; // Max pagination buttons visible at once

// Event Listener for DOM Content Loaded
document.addEventListener("DOMContentLoaded", async () => {
	await fetchBooks();
	renderPagination();
});

// Show or hide the loading indicator
function showLoadingIndicator(isLoading) {
	loader.style.display = isLoading ? "flex" : "none";
}

// Function to get wishlist from localStorage
function getWishlist() {
	const wishlist = localStorage.getItem("wishlist");
	return wishlist ? JSON.parse(wishlist) : [];
}

// Function to save wishlist to localStorage
function saveWishlist(wishlist) {
	localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Function to check if a book is in the wishlist
function isBookInWishlist(bookId) {
	const wishlist = getWishlist();
	return wishlist.some((book) => book.id === bookId);
}

// Function to toggle wishlist (add/remove book)
function toggleWishlist(book) {
	const wishlist = getWishlist();
	const bookIndex = wishlist.findIndex((item) => item.id === book.id);

	if (bookIndex === -1) {
		wishlist.push(book);
	} else {
		wishlist.splice(bookIndex, 1);
	}

	saveWishlist(wishlist);
}

// Store book data in localStorage for book details page
function storeBookData(book) {
	localStorage.setItem("selectedBook", JSON.stringify(book));
}

// Function to render books with wishlist functionality
function renderBooks(books) {
	const bookList = document.getElementById("book-list");

	if (!books || books.length === 0) {
		bookList.innerHTML = "<p>No books found.</p>";
		return;
	}

	bookList.innerHTML = books
		.map((book) => {
			const isInWishlist = isBookInWishlist(book.id);
			const bookData = encodeURIComponent(JSON.stringify(book));

			return `
            <div class="book-card">
                <div class="book-cover">
                    <button class="book-link" data-book="${bookData}">
                        <img
                            class="image"
                            src="${book.formats["image/jpeg"]}"
                            alt="${book.title}"
                        />
                    </button>
                </div>
                <div class="book-info">
                    <h3 class="book-title book-link" data-book="${bookData}">${book.title}</h3>
                    <p class="book-author"><strong>Author:</strong> ${book.authors
											.map((author) => author.name)
											.join(", ")}</p>
                    <p class="book-genre"><strong>Genre:</strong> ${
											book.subjects[0] || "N/A"
										}</p>
                    <p class="book-id"><strong>ID:</strong> #${book.id}</p>
                    <button class="wishlist-btn" data-book="${bookData}">
                        <img src="./assets/icons/${
													isInWishlist ? "heart-filled" : "heart-outlined"
												}.png" alt="${
				isInWishlist ? "Remove from wishlist" : "Add to wishlist"
			}">
                    </button>
                </div>
            </div>
        `;
		})
		.join("");

	// Add event listeners to wishlist buttons
	const wishlistButtons = document.querySelectorAll(".wishlist-btn");
	wishlistButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			const bookData = button.getAttribute("data-book");
			const book = JSON.parse(decodeURIComponent(bookData));
			toggleWishlist(book);
			const isNowInWishlist = isBookInWishlist(book.id);
			button.querySelector("img").src = `./assets/icons/${
				isNowInWishlist ? "heart-filled" : "heart-outlined"
			}.png`;
		});
	});

	// Add event listeners for book details links
	const bookLinks = document.querySelectorAll(".book-link");
	bookLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			const bookData = link.getAttribute("data-book");
			event.preventDefault();
			const book = JSON.parse(decodeURIComponent(bookData));
			storeBookData(book);
			window.location.href = "book-details.html";
		});
	});
}

// Function to fetch books with search and filter applied
async function fetchBooks(page = 1) {
	try {
		showLoadingIndicator(true);

		let url = `https://gutendex.com/books/?page=${page}`;
		if (selectedGenre) {
			url += `&topic=${encodeURIComponent(selectedGenre)}`;
		}
		if (searchQuery) {
			url += `&search=${encodeURIComponent(searchQuery)}`;
		}

		const response = await fetch(url);
		const books = await response.json();
		renderBooks(books?.results);

		if (page === 1 && books.count) {
			totalBooksCount = books.count;
			renderPagination();
		}
	} catch (error) {
		console.error("Error fetching books:", error);
	} finally {
		showLoadingIndicator(false);
	}
}

// Function to render pagination controls
function renderPagination() {
	pagination.innerHTML = "";
	const pages = Math.ceil(totalBooksCount / 32);

	// Create "Prev" button
	const prevBtn = document.createElement("button");
	prevBtn.textContent = "Prev";
	prevBtn.disabled = currentPage === 1;
	prevBtn.addEventListener("click", async () => {
		if (currentPage > 1) {
			currentPage--;
			await fetchBooks(currentPage);
			renderPagination();
		}
	});
	pagination.appendChild(prevBtn);

	// Create page number buttons
	for (
		let i = Math.max(1, currentPage - 2);
		i <= Math.min(pages, currentPage + 2);
		i++
	) {
		const pageBtn = document.createElement("button");
		pageBtn.textContent = i;
		pageBtn.disabled = i === currentPage;
		pageBtn.addEventListener("click", async () => {
			currentPage = i;
			await fetchBooks(currentPage);
			renderPagination();
		});
		pagination.appendChild(pageBtn);
	}

	// Create "Next" button
	const nextBtn = document.createElement("button");
	nextBtn.textContent = "Next";
	nextBtn.disabled = currentPage === pages;
	nextBtn.addEventListener("click", async () => {
		if (currentPage < pages) {
			currentPage++;
			await fetchBooks(currentPage);
			renderPagination();
		}
	});
	pagination.appendChild(nextBtn);
}

// Event listeners for genre filter and search input with debouncing
genreFilter.addEventListener("change", async (e) => {
	selectedGenre = e.target.value;
	currentPage = 1;
	await fetchBooks(currentPage);
	renderPagination();
});

searchInput.addEventListener("input", (e) => {
	clearTimeout(debounceTimeout);
	debounceTimeout = setTimeout(async () => {
		searchQuery = e.target.value;
		currentPage = 1;
		await fetchBooks(currentPage);
		renderPagination();
	}, 300);
});

// Reset search and filter
resetBtn.addEventListener("click", async () => {
	currentPage = 1;
	searchQuery = "";
	selectedGenre = "";
	searchInput.value = "";
	genreFilter.value = "";
	await fetchBooks(currentPage);
	renderPagination();
});
