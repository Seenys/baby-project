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