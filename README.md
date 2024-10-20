# Books finder Application

## live: [https://book-finder-js.netlify.app/](https://book-finder-js.netlify.app/)

A simple books finder web application that fetches data from the Gutendex API. It allows users to browse books, filter them by title or genre, add books to a wishlist, and paginate through the results. The application is built using HTML, CSS, and JavaScript.

## Features

- Display a list of books with title, author, cover image, genre, and ID.
- Real-time search functionality to filter books by title.
- Dropdown filter to filter books based on genre or topic.
- Wishlist functionality with local storage support.
- Pagination to navigate through the book list.
- Fully responsive design, works on both desktop and mobile.
- Built-in loading indicator while data is being fetched.

## Running the Project

### Option 1: Using VS Code Live Server

1. **Clone the Repository**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/apelmahmudDev/book-finder.git
   ```

2. **Open the Project in VS Code**

   Navigate to the project folder and open it in **Visual Studio Code**:

   ```bash
   cd book-finder
   code .
   ```

3. **Install Live Server Extension**

   If you don’t already have the **Live Server** extension installed in VS Code, follow these steps:

   - Open VS Code.
   - Go to the **Extensions** view by clicking on the Extensions icon in the Activity Bar on the side of the window or using `Ctrl+Shift+X`.
   - Search for **Live Server** and install it.

4. **Start Live Server**

   Once installed, right-click on the `index.html` file in the Explorer pane and select **Open with Live Server**. This will start a local server and open the app in your default web browser.

   Alternatively, you can start **Live Server** by clicking on the **Go Live** button in the bottom-right corner of the VS Code window.

### Option 2: Using Python HTTP Server

1. **Start Python HTTP Server**

   If you have **Python 3** installed, you can run a simple HTTP server with the following command:

   ```bash
   python -m http.server 8000
   ```

   This will start a server at `http://localhost:8000`. Open that URL in your web browser to view the application.

   If you are using **Python 2**, the command is:

   ```bash
   python -m SimpleHTTPServer 8000
   ```

## Project Structure

```
books-finder/
│
├── assets/
│   └── icons/          # Folder containing icon SVG
│   └── images          # Folder containing images
│
├── css/
│   └── styles.css      # Main CSS file
│
├── js/
│   └── app.js          # Main JavaScript file
│   └── book-details.js # JavaScript file for book details
│   └── wishlist.js     # JavaScript file for wishlist functionality
|              
├── index.html          # Main HTML file
├── book-details.html   # Book details HTML file
├── wishlist.html       # Wishlist HTML file
├── README.md           # Project README file
```

## Technologies Used

- **HTML5**: Structure of the web application.
- **CSS**: Vanilla CSS for styling, including a CSS reset.
- **JavaScript**: Handles API calls, rendering books, and implementing search, filters, wishlist, and pagination functionalities.
- **Gutendex API**: Fetches books data.

## How It Works

- When the page loads, the application fetches the list of books from the Gutendex API and displays them as book cards.
- Users can search for books in real-time, filter them by genre, and paginate through the list.
- Wishlisted books are stored in local storage, and users can toggle the wishlist status by clicking on the heart icon next to each book.
- The application is fully responsive and works on both mobile and desktop devices.
