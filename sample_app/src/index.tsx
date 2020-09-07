import * as React from "react";
import ReactDOM from 'react-dom';
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  published_date: Date;
}

class Book extends React.Component<{}, { books: Book[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    const url = "http://localhost/books";
    axios // axiosはPromiseベースのHTTPクライアント　非同期でHTTP通信を行える
      .get(url)
      .then((result) => {
        const books = result.data;
        // setStateメソッドを使って、API叩いた結果をセット
        this.setState({
          books,
        });
      }) // API叩いてるときにエラーが発生したらここでキャッチ
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { books } = this.state; // stateからbooksを取り出して代入する
    return (
      <div className="books">
        <p>Books　List</p>
        {books.map((book: Book) => {
          // mapで一つずつ取り出す
          return (
            <div key={book.id}>
              <li>{book.title}</li>
              <li>{book.author}</li>
              <li>{book.published_date}</li>
            </div>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(
  <Book />,
  document.getElementById('root')
);
