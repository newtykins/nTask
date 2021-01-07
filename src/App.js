import React from 'react';
import shortid from 'shortid';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      value: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    const todos = [];
    Object.keys(localStorage).forEach(id => {
      todos.push({ id, value: localStorage[id] });
    });
    this.setState(todos);
    console.log(todos, this.state);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  
  addTodo() {
    const { value, todos } = this.state;
    const id = shortid.generate();
    const newTodos = todos.concat({ id, value });

    this.setState({ todos: newTodos, value: '' });
    localStorage.setItem(id, value);
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" onClick={this.state.value === '' ? null : this.addTodo} />
      </div>
    );
  }
}