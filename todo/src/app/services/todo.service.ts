import {Injectable} from '@angular/core';
import {Todo} from "../models/todo.model";
import {generateUUID} from "../utils/uuid";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {
    void this.create({title: 'Home Work', description: 'Math Algebra exercises 1 to 6', dueUntil: '2023-07-11T08:00'});
    void this.create({title: 'Laundry', dueUntil: '2023-07-12T18:00'});
    void this.create({title: 'Pay Bills'});
    void this.create({title: 'Walk with dog'});
    void this.create({title: 'Buy Groceries'});
    void this.create({title: 'Cook Dinner'});
    void this.create({title: 'Exercise'});
    void this.create({title: 'Check E-Mails'});
    void this.create({title: 'Clean the house'});
    void this.create({title: 'Read Book'});
    void this.create({
      title: 'Study for exam',
      description: 'Algorithm and datastructures',
      dueUntil: '2023-07-11T07:00'
    });
  }

  async create(todoDetails: { title: string, description?: string, dueUntil?: string }): Promise<void> {
    await this.http.get(`https://source.unsplash.com/random?${todoDetails.title.replace(/\s+/g, '-')}`, {
      responseType: 'blob',
      observe: 'response',
    }).subscribe(({url}) => {
      const todo: Todo = {
        title: todoDetails.title,
        description: todoDetails.description,
        dueUntil: todoDetails.dueUntil,
        id: generateUUID(),
        createdAt: new Date().toISOString(),
        done: false,
        imageUrl: url ?? `https://source.unsplash.com/random?${todoDetails.title.replace(/\s+/g, '-')}`,
      }
      this.todos.next([...this.todos.value, todo]);
    });
  }

  remove(todoId: string): Todo | undefined {
    const todo: Todo | undefined = this.getById(todoId);
    if (todo) {
      this.todos.next(this.todos.value.filter((item: Todo) => item.id !== todoId));
      return todo;
    }
    return undefined;
  }

  markAsDone(todoId: string): void {
    const todo: Todo | undefined = this.getById(todoId);
    if (todo) {
      todo.done = true;
      todo.modifiedAt = new Date().toISOString();
      this.todos.next([...this.todos.value]);
    }
  }

  markAsDue(todoId: string): void {
    const todo: Todo | undefined = this.getById(todoId);
    if (todo) {
      todo.done = false;
      todo.modifiedAt = new Date().toISOString();
      this.todos.next([...this.todos.value]);
    }
  }

  getAll$(): Observable<Todo[]> {
    return this.todos.asObservable();
  }

  getById(todoId: string): Todo | undefined {
    return this.todos.value.find((item: Todo) => item.id === todoId);
  }

  getAllDone$(): Observable<Todo[]> {
    return this.getAll$().pipe(
      map((todos: Todo[]) => todos.filter((todo: Todo) => todo.done)),
    );
  }

  getAllDue$(): Observable<Todo[]> {
    return this.getAll$().pipe(
      map((todos: Todo[]) => todos.filter((todo: Todo) => !todo.done)),
    );
  }
}
