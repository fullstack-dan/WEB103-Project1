function bookCard({ book }) {
    const card = document.createElement("div");
    card.classList.add("card");

    const imgContainer = document.createElement("a");
    imgContainer.href = `/books/${book.id}`;
    const img = document.createElement("img");
    img.src = "/" + book.image;
    img.alt = book.title;
    imgContainer.append(img);
    card.append(imgContainer);

    const titleContainer = document.createElement("h2");
    const title = document.createElement("a");
    title.href = `/books/${book.id}`;
    title.textContent = book.title;
    titleContainer.append(title);
    card.append(titleContainer);

    const authors = book.authors.join(", ");
    const authorsContainer = document.createElement("p");
    authorsContainer.textContent = authors;
    card.append(authorsContainer);

    return card;
}

async function getBooks() {
    let books;
    await fetch("/books")
        .then((res) => res.json())
        .then((data) => {
            books = data.map((book) => {
                const card = bookCard({ book });
                return card;
            });
        });
    return books;
}

async function populateMain() {
    const books = await getBooks();
    const main = document.querySelector("#main-content");
    main.append(...books);
}

const renderBook = async () => {
    const requestedID = parseInt(window.location.pathname.split("/").pop());
    const response = await fetch("/books");
    const data = await response.json();

    const bookContent = document.getElementById("book-content");
    let book;

    if (data) {
        book = data.find((book) => book.id === requestedID);
    }

    if (book) {
        document.getElementById("image").src = "/" + book.image;
        document.getElementById("title").textContent = book.title;
        const authors = book.authors.join(", ");
        document.getElementById("authors").textContent = authors;
        document.getElementById("description").textContent = book.description;
        document.getElementById("audience").textContent =
            "Great for: " + book.audience;
        document.title = `Library - ${book.title}`;
        const tags = book.tags.join(", ");
        document.getElementById("tags").textContent = tags;
    } else {
        const nobook = document.createElement("h2");
        nobook.textContent = "book not found";
        bookContent.appendChild(nobook);
    }
};

const pathSegments = window.location.pathname.split("/").filter(Boolean);

if (pathSegments.length >= 1) {
    if (pathSegments[0] !== "books") {
        window.location.href = "../404.html";
    }
} else {
    populateMain();
}

renderBook();
