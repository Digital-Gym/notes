import type { TodoItem } from "./TodoItem";

export interface Note{
  id: number;
  title: string;
  todo: TodoItem[];
}

export function makeNote(id: number, title: string, todo: TodoItem[]){
  return {id, title, todo} as Note;
}