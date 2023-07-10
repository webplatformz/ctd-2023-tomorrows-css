import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Todo} from "../../models/todo.model";
import {TodoService} from "../../services/todo.service";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnDestroy {
  todo: Todo | undefined;

  private subscription: Subscription | undefined;

  constructor(activatedRoute: ActivatedRoute,
              private todoService: TodoService,
              private navigateService: NavigationService) {
    this.subscription = activatedRoute.params.subscribe({
      next: ({id}) => this.todo = id ? this.todoService.getById(id) : undefined,
      error: console.log,
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleDoneState(): void {
    if (this.todo) {
      if (this.todo?.done) {
        this.todoService.markAsDue(this.todo.id);
      } else {
        this.todoService.markAsDone(this.todo?.id);
      }
    }
  }

  deleteTodo(): void {
    if (this.todo) {
      this.todoService.remove(this.todo.id);
      this.navigateToMainPage();
    }
  }

  navigateToMainPage(): void {
    void this.navigateService.navigateTo('/');
  }
}
