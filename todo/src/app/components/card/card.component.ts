import {Component, Input} from '@angular/core';
import {Todo} from "../../models/todo.model";
import {TodoService} from "../../services/todo.service";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() todo: Todo | undefined;

  constructor(private todoService: TodoService, private navigateService: NavigationService) {
  }

  async navigateToDetailPage(): Promise<void> {
    const url: string = `/todos/${this.todo?.id}`;
    await this.navigateService.navigate(url, {
      queryBefore: `[data-id="${this.todo?.id}"`,
      queryAfter: '.banner-image',
    });
  }

  toggleDoneState(event: Event): void {
    event.stopPropagation();
    if (this.todo) {
      if (this.todo?.done) {
        this.todoService.markAsDue(this.todo.id);
      } else {
        this.todoService.markAsDone(this.todo?.id);
      }
    }
  }

  deleteTodo(event: Event): void {
    event.stopPropagation();
    if (this.todo) {
      this.todoService.remove(this.todo.id);
    }
  }
}
