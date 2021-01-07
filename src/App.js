import React from 'react';
import shortid from 'shortid';
import './App.css';
import Todo from './components/Todo';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      value: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.delTodo = this.delTodo.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  componentDidMount() {
    const todos = [];
    Object.keys(localStorage).forEach(id => {
      const todo = JSON.parse(localStorage[id]);
      todos.push({ id, name: todo.name, completed: todo.completed });
    });
    this.setState({ todos: todos });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  
  addTodo() {
    const { value, todos } = this.state;

    // add it
    const id = shortid.generate();
    const newTodos = todos.concat({ id, name: value, completed: false });

    // update the state and local storage
    this.setState({ todos: newTodos, value: '' });
    localStorage.setItem(id, JSON.stringify({ name: value, completed: false }));
  }

  delTodo(id) {
    const { todos } = this.state;
    const remainingTodos = todos.filter(todo => id !== todo.id);

    // update the state and local storage
    this.setState({ todos: remainingTodos });
    localStorage.removeItem(id);
  }

  editTodo(id, name) {
    const { todos } = this.state;
    const todo = todos.filter(todo => id === todo.id)[0];
    const editedTodos = todos.map(todo => id === todo.id ? {...todo, name } : todo);
    this.setState({ todos: editedTodos });
    localStorage.setItem(id, JSON.stringify({ name, completed: todo.completed }));
  }
  
  toggleCompleted(id) {
    const { todos } = this.state;
    const todo = todos.filter(todo => id === todo.id)[0];
    const newTodos = todos.map(todo => id === todo.id ? {...todo, completed: !todo.completed } : todo);
    this.setState({ todos: newTodos });
    localStorage.setItem(id, JSON.stringify({ name: todo.name, completed: !todo.completed }));
  }

  render() {
    return (
      <div className="todoapp stack-large">
        <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                Let's get things done...
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                onChange={this.handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg" onClick={this.addTodo}>
                Add
            </button>
        </form>

        <h2 id="list-heading">{this.state.todos.length} task(s) remaining</h2>

        <ul className="todo-list stack-large stack-exception">
          { this.state.todos.map(todo => <Todo id={todo.id} name={todo.name} completed={todo.completed} key={todo.id} toggleCompleted={this.toggleCompleted} delTodo={this.delTodo} editTodo={this.editTodo} />)}
        </ul>
      </div>
    );
  }
}