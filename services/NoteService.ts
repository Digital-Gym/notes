import type { Note } from '../models/Note' 
import type { TodoItem } from '../models/TodoItem';

export class EditorMemento {
  constructor(private content: Note) {}

  getContent(): Note {
    return this.content;
  }
}

export class NoteEditor{
  private content: Note;

  constructor(content: Note){
    this.content = content;
  }

  editTitle(title: string): void {
    this.content.title = title;
  }

  editTodoItem(todoItem: TodoItem): void{
    this.content.todo[todoItem.id] = todoItem;
  }

  getContent(): Note {
    return this.content;
  }

  save(): EditorMemento {
    return new EditorMemento(this.content);
  }

  restore(memento: EditorMemento): void {
    this.content = memento.getContent();
  }
}

export class EditorHistory {
  private history: EditorMemento[] = [];
  private canceled: EditorMemento[] = [];

  push(memento: EditorMemento): void {
    this.history.push(memento);
  }

  pop(): EditorMemento | undefined {
    const last =  this.history.pop();

    if(!last){
      return undefined;
    }

    this.canceled.push(last);
    return last;
  }

  undoPop(): boolean {
    const lastCanceled = this.canceled.pop();

    if(!lastCanceled){
      return false;
    }

    this.push(lastCanceled);
    return true;
  }
}