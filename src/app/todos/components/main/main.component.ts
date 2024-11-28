import { Component, computed, inject, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { FilterEnum } from '../../types/filter.enum';
// import { TodosComponent } from '../main.component';
import { forkJoin } from 'rxjs';
import { TodosFirebaseService } from '../../services/todos-firebase.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgClass,TodoComponent,NgFor ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  todosService = inject(TasksService);
  todosFirebaseService = inject(TodosFirebaseService);
  editingId: string | null = null;

  visibleTodos = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;
  });
  isAllTodosSelected = computed(() =>
    this.todosService.todosSig().every((todo) => todo.isCompleted)
  );
  noTodosClass = computed(() => this.todosService.todosSig().length === 0);

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    const requests$ = this.todosService.todosSig().map((todo) => {
      return this.todosFirebaseService.updateTodo(todo.id, {
        text: todo.text,
        isCompleted: target.checked,
      });
    });
    forkJoin(requests$).subscribe(() => {
      this.todosService.toggleAll(target.checked);
    });
  }
}
