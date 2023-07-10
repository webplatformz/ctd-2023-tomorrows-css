import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-new-todo-form',
  templateUrl: './new-todo-form.component.html',
  styleUrls: ['./new-todo-form.component.css']
})
export class NewTodoFormComponent {
  @ViewChild('closeButton') closeButton: any;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    dueUntil: new FormControl(''),
  });

  constructor(private todoService: TodoService) {
  }

  async createNewTodo(): Promise<void> {
    if (this.form.valid) {
      this.closeButton.nativeElement.click();
      await this.todoService.create(this.form.value);
      this.form.reset();
    }
  }
}
