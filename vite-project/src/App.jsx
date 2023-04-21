import React from 'react';
import './App.css';

// App component to store the To-do list
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentTodo: ""
    }
  }

  // Handle input field changes
  handleChange = e => {
    this.setState({
      currentTodo: e.target.value
    });
  };

  // Add the to-do to the list
  handleAddTodo = () => {
    const newTodo = {
      text: this.state.currentTodo,
      isCompleted: false
    }
    const todos = [...this.state.todos, newTodo];
    this.setState({
      todos,
      currentTodo: ""
    });
  };

  // Delete the to-do
  handleDeleteTodo = index => {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({
      todos
    });
  };

  // Edit the to-do
  handleEditTodo = (index, text) => {
    const todos = [...this.state.todos];
    todos[index].text = text;
    this.setState({
      todos
    });
  };

  // Check the to-do
  handleCheckTodo = (index, isCompleted) => {
    const todos = [...this.state.todos];
    todos[index].isCompleted = isCompleted;
    this.setState({
      todos
    });
  };

  render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.currentTodo}
          onChange={this.handleChange}
        />
        <button onClick={this.handleAddTodo}>Add</button>
        {this.state.todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            onEdit={this.handleEditTodo}
            onDelete={this.handleDeleteTodo}
            onCheck={this.handleCheckTodo}
          />
        ))}
      </div>
    );
  }
}

// Todo component to store the to-do
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      editText: this.props.todo.text
    }
  }

  // Handle change in edit text field
  handleChange = e => {
    this.setState({
      editText: e.target.value
    });
  };

  // Toggle edit mode
  toggleEditMode = () => {
    this.setState({
      isEditMode: !this.state.isEditMode
    });
  };

  // Handle edit
  handleEdit = () => {
    this.props.onEdit(this.props.index, this.state.editText);
    this.toggleEditMode();
  };

  render() {
    return (
      <div>
        {this.state.isEditMode ? (
          <div>
            <input
              type="text"
              value={this.state.editText}
              onChange={this.handleChange}
            />
            <button onClick={this.handleEdit}>Save</button>
          </div>
        ) : (
          <div>
            <input
              type="checkbox"
              checked={this.props.todo.isCompleted}
              onChange={() => this.props.onCheck(this.props.index, !this.props.todo.isCompleted)}
            />
            <span
              style={{
                textDecoration: this.props.todo.isCompleted ? "line-through" : ""
              }}
            >
              {this.props.todo.text}
            </span>
            <button onClick={this.toggleEditMode}>Edit</button>
            <button onClick={() => this.props.onDelete(this.props.index)}>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;