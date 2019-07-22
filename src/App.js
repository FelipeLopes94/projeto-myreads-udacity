import React from "react";
import "./App.css";
import BookShelf from "./componentes/BookShelf.js"; //componente de tratativa da estante de livros
import BookSearch from "./componentes/buscaLivro.js";
import * as BooksAPI from "./API_LIVRO/BooksAPI";
import { Link, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
    shelves: [
      {
        id: "currentlyReading",
        name: "Lendo Atualmente"
      },
      {
        id: "wantToRead",
        name: "Ainda Quero Ler"
      },
      {
        id: "read",
        name: "já Li"
      }
    ]
  };

  componentDidMount() { //trazer todos livros e montar estante
    BooksAPI.getAll().then(shelvedBooks => {
      this.setState({ shelvedBooks });
    });
  }
  changeShelf = (bookToAdd, shelf) => {
    this.setState(state => {
          const nextState = state.shelvedBooks.filter(book => book.id !== bookToAdd.id).concat( [{...bookToAdd, shelf}] );
          return { shelvedBooks: nextState };
        });
      }

  render() {
    return (
      <div className="app">
        <Route path="/search"
          render={() => (
            <BookSearch
              shelvedBooks={this.state.shelvedBooks}
              changeShelf={this.changeShelf}
            />
          )}
        />
        <Route //tratar a parte de adição de livros com novo endereço
          exact
          path="/" //remeter ao endereço de adição de livros a estante
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>Projeto MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.state.shelves.map(shelf => (
                  <BookShelf
                    key={shelf.id}
                    shelf={shelf}
                    shelvedBooks={this.state.shelvedBooks}
                    books={this.state.shelvedBooks.filter(shelvedBooks => {
                      return shelvedBooks.shelf === shelf.id;
                    })}
                    changeShelf={this.changeShelf}
                  />
                ))}
              </div>
              <div className="open-search">
              <Link to='/search'>Adicionar novo Livro</Link>
            </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;