// catalogo.js

// Función para leer y procesar el archivo CSV
async function loadBooks() {
    const response = await fetch('libros.csv');
    const data = await response.text();
    const books = parseCSV(data);
    displayBooks(books);
}

// Función para convertir el CSV en un array de objetos
function parseCSV(data) {
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        let book = {};
        headers.forEach((header, index) => {
            book[header.trim()] = values[index].trim();
        });
        return book;
    });
}

// Función para mostrar los libros en la página
function displayBooks(books) {
    const container = document.getElementById('booksContainer');
    container.innerHTML = ''; // Limpiar contenedor
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';
        if (book.Estado == 'agotado'){
            bookElement.innerHTML = `
                <img src="imagenes/${book.Imagen}" alt="Portada de ${book.Título}">
                <h3>${book.Título}</h3>
                <p>Editorial: ${book.Editorial}</p>
                <p>Colección: ${book.Colección}</p>
                <h2>AGOTADO :(</h2>
                <a href="https://wa.me/${book.WhatsApp}" class="whatsapp-link">Contactar al Vendedor</a>
            `;
        } else{
            bookElement.innerHTML = `
                <img src="imagenes/${book.Imagen}" alt="Portada de ${book.Título}">
                <h3>${book.Título}</h3>
                <p>Editorial: ${book.Editorial}</p>
                <p>Colección: ${book.Colección}</p>
                <a href="https://wa.me/${book.WhatsApp}" class="whatsapp-link">Contactar al Vendedor</a>
            `;
        }
        container.appendChild(bookElement);
    });
}
//<p>Dueño: ${book.Dueño}</p>


// Función para filtrar libros por colección
function filterBooks(coleccion) {
    loadBooks().then(books => {
        const filteredBooks = books.filter(book => book.Colección === coleccion);
        displayBooks(filteredBooks);
    });
}

// Función para buscar libros por el término en la barra de búsqueda
document.getElementById('searchBar').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    loadBooks().then(books => {
        const filteredBooks = books.filter(book => 
            book.Título.toLowerCase().includes(term) || 
            book.Autor.toLowerCase().includes(term)
        );
        displayBooks(filteredBooks);
    });
});

// Cargar libros al iniciar la página
window.onload = loadBooks;
