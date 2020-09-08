export interface BookInterface {
  id: number;
  title: string;
  author: string;
  published_date: Date;
}

export interface BookPropsInterface {
  book: BookInterface;
  onClick: (passedBook: BookInterface) => void;
}

export interface CreatedBookInterface {
  title: string;
  author: string;
  published_date: Date;
}

export interface CreatedBookPropsInterface {
  book: CreatedBookInterface;
  onClick: (createdBook: CreatedBookInterface) => void;
}

export interface BookDeletePropsInterface {
  book: BookInterface;
  onClick: (passedBook: BookInterface) => void;
  deleteClick: (deleteId: number) => void;
}
