import { Component, inject } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TodosFirebaseService } from '../../services/todos-firebase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  todosService = inject(TasksService);
  todosFirebaseService = inject(TodosFirebaseService);
  text: string = '';

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    this.todosFirebaseService.addTodo(this.text).subscribe((addedTodoId) => {
      this.todosService.addTodo(this.text, addedTodoId);
      this.text = '';
    });
  }
}
