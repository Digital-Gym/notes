import type { Note } from '../models/Note' 

export class EditorMemento {
  constructor(private content: Note) {}

  getContent(): Note {
    return this.content;
  }
}

export class EditorHistory {
  private history: EditorMemento[] = [];
  private canceled: EditorMemento[] = [];

  push(memento: EditorMemento): void {
    this.history.push(memento);
  }

  getLast(){
    return this.history[this.history.length - 1];
  }

  pop(): EditorMemento | undefined {
    if(this.history.length == 1){
      return undefined;
    }

    const removed = this.history.pop();
    
    if(!removed){
      return undefined;
    }

    this.canceled.push(removed);
    return this.getLast();
  }

  undoPop(): EditorMemento | undefined {
    const lastCanceled = this.canceled.pop();

    if(!lastCanceled){
      return undefined;
    }

    this.push(lastCanceled);
    return this.getLast();
  }
}