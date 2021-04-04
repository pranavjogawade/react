import React, { Component } from 'react';
import { TodoBanner } from './TodoBanner';
import { TodoCreator } from './ToDoCreator';
import { TodoRow } from './TodoRow';
import { VisibilityControl } from './VisibilityControl';



export default class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      userName: 'Pranav',
      todoItems: [
        {action: 'Buy Flowers', done: false},
        {action: 'Buy Shoes', done: false},
        {action: 'Collect Flowers', done: true},
        {action: 'Call Pranav', done: false},
      ],
      showCompleted: true
      //newItemText: ''
    }
  }

  // changeStateData = () => {
  //   this.setState(
  //     {
  //       userName: this.state.userName === 'Pranav' ? 'Rasika': 'Jogawade',
        
  //     }
  //   )
  // }

  updateNewTextValue = (event) => {
    this.setState(
      {
        newItemText: event.target.value
      }
    )
  }

  createNewTodo = (task) => {
    if(!this.state.todoItems.find(item => item.action === task)) {
      this.setState(
        {
          todoItems: [...this.state.todoItems, {action: task, done: false}],
          newItemText: ''
        }
      )
    }
  }

  toggleTodo = (todo) => {
    this.setState({
      todoItems: this.state.todoItems.map(item=> item.action === todo.action ? {...item, done: !item.done}: item)
    })
  }

  todoTableRows = (doneValue) => 
                this.state.todoItems.filter(item => item.done === doneValue)
                .map(item => <TodoRow key={item.action} item={item} callback={this.toggleTodo}></TodoRow>)
    // <tr key={item.action}>
    //   <td>{item.action}</td>
    //   <td>
    //     <input type="checkbox" checked={item.done} onChange={()=>this.toggleTodo(item)}/>
    //   </td>
    // </tr>
    

  render = () => {
    return (
      <div>
        <TodoBanner name={this.state.userName} tasks={this.state.todoItems}></TodoBanner>
        
        <div className="container-fluid">
          {/* <div className="my-1">
            <input className="form-control" value={this.state.newItemText} onChange={this.updateNewTextValue} />
            <button className="btn btn-primary mt-1" onClick={this.createNewTodo}>
              Add
            </button>
          </div> */}
          <TodoCreator callback={this.createNewTodo}></TodoCreator>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {this.todoTableRows(false)}
            </tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed tasks" isChecked={this.state.showCompleted} callback={(checked) => this.setState({showCompleted: checked})}></VisibilityControl>
          </div>
          {this.state.showCompleted && 
            <table className="table table-striped table-bordered">
              <thead>
                <tr><th>Description</th><th>Done</th></tr>
              </thead>
              <tbody>
                {this.todoTableRows(true)}
              </tbody>
            </table>
            }
        </div>
      </div>
    );
  }
} 
