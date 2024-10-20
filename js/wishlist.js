// DOM Elements
const wishlistContainer = document.getElementById("wishlist-container");
const removeButtons = document.querySelectorAll(".remove-btn");

// Retrieve wishlist books from localStorage
function getWishlistBooks() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist;
}

// Render wishlist books
function renderWishlist() {
    const books = getWishlistBooks();

    if (books.length === 0) {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    // Render each wishlist book
    wishlistContainer.innerHTML = books
        .map((book) => `
            <div class="wishlist-item">
                <img src="${book.formats["image/jpeg"]}" alt="${book.title}" class="wishlist-cover"/>
                <div class="wishlist-info">
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.authors.map((author) => author.name).join(", ")}</p>
                    <p><strong>Genre:</strong> ${book.subjects[0] || "N/A"}</p>
                    <button class="remove-btn" data-id="${book.id}">
                        <img src="./assets/icons/heart-filled.png" alt="Remove from Wishlist"/>
                        Remove from Wishlist
                    </button>
                </div>
            </div>
        `).join("");

    // Add event listeners for "Remove" buttons after rendering
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const bookId = button.getAttribute("data-id");
            removeBookFromWishlist(bookId);
        });
    });
}

// Function to remove a book from the wishlist
function removeBookFromWishlist(bookId) {
    let wishlist = getWishlistBooks();
    wishlist = wishlist.filter((book) => book.id !== parseInt(bookId));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist();
}

// Function to toggle a book in the wishlist
function toggleWishlist(book) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isInWishlist = wishlist.some((wishBook) => wishBook.id === book.id);

    if (isInWishlist) {
        wishlist = wishlist.filter((wishBook) => wishBook.id !== book.id);
    } else {
        wishlist.push(book);
    }

    // Update localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Initial render
renderWishlist();
