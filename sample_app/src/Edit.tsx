import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { BookPropsInterface } from "./BookInterface";
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

const EditModal = (props: BookPropsInterface) => {
  const [title, settitle] = useState(props.book.title);
  const [author, setauthor] = useState(props.book.author);
  const [published_date, setpublished_date] = useState(
    props.book.published_date
  );
  const handleDateChange = (date: Date) => {
    setpublished_date(new Date(date));
  };
  const classes = useStyles();
  const classesInput = useStylesInput();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setBookTitle = (value: string) => {
    const newtitle = value;
    settitle(newtitle);
  };
  const setBookAuthor = (value: string) => {
    const newtitle = value;
    setauthor(newtitle);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className={classesInput.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value: string = String(event.target.value);
            setBookTitle(value);
          }}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={author}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value: string = String(event.target.value);
            setBookAuthor(value);
          }}
        />
        <DatePicker
          selected={new Date(Moment(published_date).format("YYYY-MM-DD"))}
          onChange={handleDateChange}
          className="datepicker-form"
        />
        <button
          onClick={() => {
            const book = {
              id: props.book.id,
              title: title,
              author: author,
              published_date: published_date,
            };
            props.onClick(book);
          }}
        >
          Save
        </button>
      </form>
    </div>
  );

  return (
    <div>
      <ContainerButton title="編集する" opnModal={handleOpen} />
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

export default EditModal;