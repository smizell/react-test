/** @jsx React.DOM */

(function (window, React) {
  'use strict';

  var TodoApp = React.createClass({
    onTodoSubmit: function(todo) {
      this.setState({data: this.state.data.concat([todo])});
    },
    toggle: function(todoToToggle) {
      var newTodos = this.state.data.map(function(todo) {
        return todo !== todoToToggle ? todo : {title: todo.title, completed: !todo.completed}
      });
      this.setState({data: newTodos});
    },
    getInitialState: function() {
      return {data: [{title: "Test", completed: false}]};
    },
    render: function () {
      return (
        <div className="main">
          <TodoForm onTodoSubmit={this.onTodoSubmit} />
          <TodoList todos={this.state.data} onToggle={this.toggle} />
        </div>
      );
    }
  });

  var TodoForm = React.createClass({
    handleSubmit: function() {
      var todoTitle = this.refs.title.getDOMNode().value.trim();

      // This is a callback passed in as a property
      this.props.onTodoSubmit({title: todoTitle, completed: false});

      this.refs.title.getDOMNode().value = '';
      return false;
    },
    render: function() {
      return (
        <div className="todo-form">
          <form className="form" onSubmit={this.handleSubmit}>
            <input type="text" name="title" className="form-control" placeholder="New Todo" ref="title" />
          </form>
        </div>
      );
    }
  });

  var TodoList = React.createClass({
    render: function() {
      var _this = this;
      var todoNodes = this.props.todos.map(function(todo) {
        return (<Todo todo={todo} onToggle={_this.props.onToggle.bind(this, todo)} />);
      })
      return (
        <table className="todo-list table table-striped">
          <tbody>{todoNodes}</tbody>
        </table>
      );
    }
  });

  var Todo = React.createClass({
    toggle: function() {
      this.props.onToggle();
    },
    render: function() {
      return (
        <tr className={React.addons.classSet({warning: this.props.todo.completed})}>
          <td width="10"><button href="" className="btn btn-success btn-xs" onClick={this.toggle}>toggle</button></td>
          <td>{this.props.todo.title}</td>
        </tr>
      );
    }
  });

  React.renderComponent(
    <TodoApp />,
    document.getElementById('content')
  );
})(window, React);