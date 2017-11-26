import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  inputHint = 'What needs to be done?';
  todos = [];
  todo = '';
  isToggleAll = false;

  constructor(private dataSvc: DataService) {

  }

  ngOnInit() {
    this.dataSvc.getTodos()
      .subscribe(data => {
        this.todos = data;
      });
  }

  addTodo() {
    if (this.todo) {
      let newTodo = {
        text: this.todo,
        done: false
      };
      this.dataSvc.addTodo(newTodo)
        .subscribe(data => {
          this.todos = this.todos.concat(data);
          this.todo = '';
        });
    }
  }

  todoInputChange($event) {
    this.todo = $event;
  }

  clearCompleted() {
    this.todos
      .filter(item => item.done)
      .forEach(item => {
        this.removeTodo(item);
      });
  }

  toggleAll() {
    this.todos.forEach(item => {
      item.done = this.isToggleAll;
      this.updateTodo(item);
    });
  }

  removeTodo(todo) {
    this.dataSvc.deleteTodo(todo)
      .subscribe(() => {
        this.todos = this.todos.filter(item => item !== todo);
      })
  }

  updateTodo(todo) {
    this.dataSvc.updateTodo(todo)
      .subscribe();
  }

}
