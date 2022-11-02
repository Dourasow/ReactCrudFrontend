import axios from 'axios'

const API_backend_URL = "http://localhost:8067/api/vi/employees";
class EmployeeService{

    getEmployee(){
        return axios.get(API_backend_URL);
    }

    createEmployee(employee){
        return axios.post(API_backend_URL, employee);
    }

    getEmployeebyId(employeeId){
        return axios.get(API_backend_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(API_backend_URL + '/' + employeeId, employee)
    }

    deleteEmployee(employeeId){
        return axios.delete(API_backend_URL + '/' + employeeId)
    }
    

}
export default new EmployeeService();