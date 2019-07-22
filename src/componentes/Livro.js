import React from "react";
import * as BooksAPI from "../API_LIVRO/BooksAPI";

class Livro extends React.Component {
  
  constructor(props) {
    super(props); //Super para acessar o Objeto PAI
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.changeShelf(this.props.book, event.target.value);
    BooksAPI.update(this.props.book, event.target.value);
  }
  mapShelf(findBook) {
    const defaultShelf = "none";
    if (findBook.shelf) {
      return findBook.shelf;
    } else {
      
      const match = this.props.shelvedBooks.filter(
        book => book.id === findBook.id
      );
      
      if (!Array.isArray(match) || !match.length) {
        return defaultShelf;
        
      } else {
        return match[0].shelf;
      }
    }
  }
 mapImage(book) {
    
    if (book.imageLinks && book.imageLinks.thumbnail) {
      return `url(${book.imageLinks.thumbnail})`;
      
    } else {
      return "none";
    }
  }
  render() {
   
    const book = this.props.book;
   //tratativa dos livros na estante de adição
    return (
      <li> 
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 190,
                height: 200,
                backgroundImage: `${this.mapImage(book)}`
              }}
            />

            <div className="book-shelf-changer">
              <select
                defaultValue={this.mapShelf(book)}
                onChange={this.handleChange}
              >
                <option disabled>
                  Mover para...
                </option> //Box com opção de onde mandar o livro
                <option value="currentlyReading">Lendo atualmente</option>
                <option value="wantToRead">Ainda Quero Ler</option>
                <option value="read">já li </option>
                <option value="none">Nenhum</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
            {book.authors && book.authors && book.authors.map((author)=>(
                <div key={author} className="book-authors">{ author }</div>
            ))}
        </div>
      </li>
    );
  }
}

export default Livro;
