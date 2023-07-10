import {Component, Input} from '@angular/core';
import {Todo} from "../../models/todo.model";
import {TodoService} from "../../services/todo.service";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() todo: Todo | undefined;

  constructor(private todoService: TodoService, private navigateService: NavigationService) {
  }

  navigateToDetailPage(event: Event): void {
    const url: string = `/todos/${this.todo?.id}`;
    const imageElement: HTMLElement | null = (event.currentTarget as HTMLElement).children.item(0) as HTMLElement;
    if (imageElement) {
      // @ts-ignore
      // this.navigateService.navigateWithStayingElement(url, imageElement, 'todo-image');
      // return;
    }
    this.navigateService.navigateWithElementAnimation(
      url,
      `[data-id="${this.todo?.id}"]`,
      'img.banner-image',
      'todo-image');
    // this.navigateService.navigateTo(url);
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
