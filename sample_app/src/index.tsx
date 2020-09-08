import * as React from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import {
  BookInterface,
  CreatedBookInterface,
  BookDeletePropsInterface
} from "./BookInterface";
import CreateModal from "./CreateBook";
import EditModal from "./Edit";
import Moment from "moment";
import "./App.css"
import { ContainerButtonForDelete } from './Button'


const url = "http://localhost/api/books/";

interface Book {
  id: number;
  title: string;
  author: string;
  published_date: Date;
}

class Book extends React.Component<{}, { books: BookInterface[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
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

  // CreateBookInterfaceというBookの型を引数で受け取るように指定
  handleBookInfoForAdding(book: CreatedBookInterface) {
    axios({
      method: "POST",
      url: url,
      headers: {
        "Content-Type": 'application/json',
      },
      data: book,
    }).then((result) => {
      this.setState({
        books: result.data,
      });
    });
  }

  // 編集したbookをDB更新し、stateを更新する関数
  handleBookInfoForEditing(book: BookInterface) {
    const books: BookInterface[] = this.state.books.slice();
    const returnBooks: BookInterface[] = books.map((mappedBook) => {
      if (mappedBook.id === book.id) {
        axios({
          method: "PATCH",
          url: url + book.id,
          data: book,
        }).then((result) => {
          console.log(result.data);
        });
        return {
          ...mappedBook,
          id: book.id,
          title: book.title,
          author: book.author,
          published_date: new Date(book.published_date),
        };
      }
      return mappedBook;
    });
    this.setState({
      books: returnBooks,
    });
  }

  handeBookInfoForDeleting(id: number) {
    const books: BookInterface[] = this.state.books.slice();
    const newBooks: BookInterface[] = books.filter((book) => book.id !== id);
    axios({
      method: "DELETE",
      url: url + id,
    }).then((result) => {
      console.log(result);
    });
    this.setState({
      books: newBooks,
    });
  }

  // ごちゃごちゃしないように、Bookコンポーネントを返すだけの関数を設定し、それをrenderの中で実行
  renderBookInfo(book: BookInterface) {
    return (
      <BookCard
        book={book}
        onClick={(passedBook: BookInterface) => {
          this.handleBookInfoForEditing(passedBook);
        }}
        // 追記
        deleteClick={(deleteId: number) => {
          this.handeBookInfoForDeleting(deleteId);
        }}
      />
    );
  }

  render() {
    const { books } = this.state; // stateからbooksを取り出して代入する
    const book: CreatedBookInterface = {
      title: "",
      author: "",
      published_date: new Date(),
    };
    return (
      <div className="books">
        <div className="title-box">
          <p>Books　List</p>
          <CreateModal
            book={book}
            // createdBookを引数で渡すということをアロー関数で指定して、コンポーネントの中で関数を実行させる
            onClick={(createdBook: CreatedBookInterface) => {
              this.handleBookInfoForAdding(createdBook);
            }}
          />
        </div>
        <div className="row">
          <div className="grid-12">
            <ul className="block-grid block-grid-1-2-3">
              {books.map((book: BookInterface) => {
                // mapで一つずつ取り出して、カードに表示する
                return <li key={book.id}>{this.renderBookInfo(book)}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class BookCard extends React.Component<
  BookDeletePropsInterface,
  BookInterface
  > {
  constructor(props: BookDeletePropsInterface) {
    super(props);
    this.state = {
      id: 1,
      title: "",
      author: "",
      published_date: new Date(),
    };
  }

  render() {
    const book = {
      id: this.props.book.id,
      title: this.props.book.title,
      author: this.props.book.author,
      published_date: this.props.book.published_date,
    };
    return (
      <div>
        <ul className="bookinfo-list">
          <li>{book.title}</li>
          <li>{book.author}</li>
          {/* Datepickerを使用して編集しているため、それに合わせるためにmomentライブラリを使ってフォーマットする */}
          <li>{Moment(book.published_date).format("YYYY-MM-DD")}</li>
          <EditModal book={book} onClick={this.props.onClick} />
          {/* 追記 */}
          <ContainerButtonForDelete
            title="削除する"
            deleteClick={this.props.deleteClick}
            deleteId={book.id}
          />
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Book />,
  document.getElementById('root')
);
