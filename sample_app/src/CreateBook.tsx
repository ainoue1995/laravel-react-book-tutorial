import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { CreatedBookPropsInterface } from "./BookInterface";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "moment";
import "moment/locale/ja";
import { ContainerButton } from "./Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
// modalのスタイル
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

// inputのスタイル
const useStylesInput = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);
// modalコンポーネントを実装し、受け取るpropsの型を、
// booｋとstateを更新するためのメソッドを持ったCreatedBookPropsInterfaceにする
const CreateModal = (props: CreatedBookPropsInterface) => {
  // 関数コンポーネントなので、Hooksでステート管理
  const [title, settitle] = useState(props.book.title);
  const [author, setauthor] = useState(props.book.author);
  const [published_date, setpublished_date] = useState(props.book.published_date);
  // Datepickerコンポーネントでmomentを使ってフォーマットを修正したものを再びDate型にするための関数
  const handleDateChange = (date: Date) => {
    setpublished_date(new Date(date));
  };
  // 上記で定義したスタイルを定数に格納
  const classes = useStyles();
  const classesInput = useStylesInput();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  // modalを表示する
  const handleOpen = () => {
    setOpen(true);
  };

  // modalを閉じる
  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const book = {
      title: title,
      author: author,
      published_date: published_date,
    };
    props.onClick(book);
    handleClose();
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className={classesInput.root} noValidate autoComplete="off">
        {/* titleを編集するためのinput */}
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="本のタイトル"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value: string = String(event.target.value);
            settitle(value);
          }}
        />
        {/* authorを編集するためのinput */}
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="本の著者"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value: string = String(event.target.value);
            setauthor(value);
          }}
        />
        {/* published_dateを編集するためのinput */}
        <DatePicker
          selected={new Date(Moment(published_date).format("YYYY-MM-DD"))}
          onChange={handleDateChange}
          className="datepicker-form"
        />
        {/* 新規作成時に */}
        <button onClick={handleOnClick}>
          Save
        </button>
      </form>
    </div>
  );

  // 最終的にinputの項目らを表示するためのモーダルを表示するボタンをreturnする
  return (
    <div>
      {/* ボタンもmaterial-uiの項目から持ってくるため、ボタンコンポーネントを利用 */}
      <ContainerButton title="新規作成" opnModal={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default CreateModal;
