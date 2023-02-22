export type FirebaseAddTodo = {
    userId: string,
    title: string,
    description: string,
    status: boolean,
}

export type FirebaseToggleTodoStatus = {
    docId: string,
    status: boolean,
}

export type Gifts = {
    [key: string]: Gift;
  };
  
export type Gift = {
    id: string;
    gift: string;
    quantity: number;
    selected: boolean;
};