import React, { Component } from 'react'
import EmployeeService from '../service/EmployeeService'
import withNavigateHook from './withNavigateHook';

class EmployeeComponent extends Component {

    constructor(props) {
      super(props)
     
      this.state = {
         employees: []
      }
      this.addEmployee = this.addEmployee.bind(this);
      this.editEmployee = this.editEmployee.bind(this);
      this.deleteEmployee = this.deleteEmployee.bind(this);
    
    }

    componentDidMount(){
      EmployeeService.getEmployee().then((res) =>{
        this.setState({employees: res.data});
      });

    
    }

   editEmployee(id){
    this.props.navigation(`/add-employee/${id}`)
   }

   deleteEmployee(id){
    EmployeeService.deleteEmployee(id).then(res => {
      this.setState({employees: this.state.employees.filter(employee => employee.id !== id)})
    })

}
    addEmployee = () => {
      // console.log("To product");
      this.props.navigation('/add-employee/-1');
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Employee List</h2>
        <div className='row'>
          <button className='btn btn-primary' onClick={this.addEmployee}> Add Employee </button>
        </div>
            <div className="row">
               <table className="table table-striped table-bordered">
            <thead className='thead-dark'>
                <tr>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                this.state.employees.map(
                    employee =>
                    <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                          <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info"> Update </button>
                          <button onClick={() => this.deleteEmployee(employee.id)} style={{marginLeft: '15px'}} className="btn btn-danger"> Delete</button>
                        </td>
                        
                    </tr>
                )
                }
            </tbody>
            </table>
            </div>
      </div>
    )
  }
}

//export default EmployeeComponent
export default withNavigateHook(EmployeeComponent);