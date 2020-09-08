import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// CreateModalコンポーネントからボタンコンポーネントを作成するときに、
// Propsで渡すものをinterfaceにして定義する
interface ButtonTItleInterface {
  title: string;
  opnModal: () => void;
}

interface ButtonForDeleteInterface {
  title: string;
  deleteClick: (deleteId: number) => void;
  deleteId: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

// 定義したinterfaceを渡されるPropsの型として指定し、コンポーネントを実装
export const ContainerButton = (props: ButtonTItleInterface) => {
  const classes = useStyles();

  if (props.title === "新規作成") {
    return (
      <div className={classes.root}>
        {/* 渡されたPropsにある文字列を表示し、モーダルを開くための関数をButtonのOnclickに指定 */}
        <Button variant="contained" onClick={props.opnModal} color="primary">
          {props.title}
        </Button>
      </div>
    );
  } else if (props.title === "編集する") {
    return (
      <div className={classes.root}>
        <Button variant="contained" onClick={props.opnModal}>
          {props.title}
        </Button>
      </div>
    );
  }

  return <div className={classes.root}></div>;
};

export const ContainerButtonForDelete = (props: ButtonForDeleteInterface) => {
  const classes = useStyles();

  const deleteBook = (id: number) => {
    props.deleteClick(id);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          deleteBook(props.deleteId);
        }}
      >
        {props.title}
      </Button>
    </div>
  );
};