import {Component} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../models/todo.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  closedTodos$: Observable<Todo[]> = this.todoService.getAllDone$();
  openTodos$: Observable<Todo[]> = this.todoService.getAllDue$();

  constructor(private todoService: TodoService) {
  }

  sortByDue(a: Todo, b: Todo): 0 | 1 | -1 {
    if (a.dueUntil && b.dueUntil) {
      return a.dueUntil > b.dueUntil ? 1 : -1;
    }
    if (a.dueUntil) {
      return -1;
    }
    if (b.dueUntil) {
      return 1;
    }
    return 0;
  }
}
