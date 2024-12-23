export interface TodoItem{
  id: number;
  task: string;
  status: boolean;
}

export type TodoItemWithOrder = TodoItem & {
  order: number;
};