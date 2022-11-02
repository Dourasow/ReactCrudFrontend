import React, { Component } from 'react'
import { useParams } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import withNavigateHook from './withNavigateHook';

 class CreateEmployeeComponent extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        id: this.props.params.id,
        firstName: '',
        lastName: '',
        email: ''
      }
      this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
      this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
      this.saveorUpdateEmployee = this.saveorUpdateEmployee.bind(this);
      this.cancel = this.cancel.bind(this)
    }

    changeFirstNameHandler = (event) =>{
      this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) =>{
      this.setState({lastName: event.target.value});
    }

    changeEmailHandler = (event) => {
      this.setState({email: event.target.value});
    }

    //Update and Create
    componentDidMount(){

      if(this.state.id === -1){
        return 
      }else{
        EmployeeService.getEmployeebyId(this.state.id).then( (res) =>{
          let employee = res.data;
          this.setState({firstName: employee.firstName,
                       lastName: employee.lastName,
                       email: employee.email
              });
      });
      }
    }

    saveorUpdateEmployee = (e) => {
      e.preventDefault();
      let employee = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email};
      console.log('employee =>' + JSON.stringify(employee));  


      if(this.state.id === -1){
        EmployeeService.createEmployee(employee).then(res => {
          this.props.navigation('/employees');
        })
      } else{
        EmployeeService.updateEmployee(employee, this.state.id).then(res => {
          this.props.navigation('/employees')
        })
      }
      }
     
    
    cancel = () => {
      this.props.navigation('/employees');
    }

    getTitle(){
      if(this.state.id == -1){
        return  <h3 className='text-center'> Add Employee</h3>
      }else {
        return <h3 className='text-center'> Update Employee</h3>
      }
    }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                      this.getTitle()
                    }
                <div className='card-body'>
                  <form>
                    <div className='form-group'>
                      <label>First Name: </label>
                        <input placeholder='first Name' name='firstName' className='form-control'
                         value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                    </div>
                    <div className='form-group'>
                      <label>Last Name: </label>
                        <input placeholder='last Name' name='lastName' className='form-control'
                          value={this.state.lastName} onChange={this.changeLastNameHandler}></input>
                    </div>
                    <div className='form-group'>
                      <label> Email: </label>
                        <input placeholder='Email' name='email' className='form-control'
                          value={this.state.email} onChange={this.changeEmailHandler}></input>
                    </div>
                      <button className='btn btn-success' onClick={this.saveorUpdateEmployee} > Save </button>
                      <button className='btn btn-danger' onClick={this.cancel} style={{marginLeft: '10px'}}> Cancel </button>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withNavigateHook(CreateEmployeeComponent)