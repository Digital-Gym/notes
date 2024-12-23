export interface TodoItem{
  id: number;
  task: string;
  status: boolean;
}

export type TodoItemExtra = TodoItem & {
  order: number;
};