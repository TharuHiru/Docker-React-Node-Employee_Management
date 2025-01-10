//Import react and hooks from 'react' module
import React, { useState } from 'react';

//Function for inintializing the state
function EmployeeForm({ addEmployee }) {
  const [employee, setEmployee] = useState({ name: '', position: '' });
  //"Employee" is an object to save the employee data
  //"Set employee is the function to uodate the employee object" , Initially Both name and position are empty strings.

  //A function that runs when the user types in a form field.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  //Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent the default browser behavior of reloading the page

    //Form validation part
    if (!employee.name || !employee.position) {
      alert('All fields are required!');
      return;
    }

    addEmployee(employee); // Calls the addEmployee function (passed as a prop) with the form data.
    setEmployee({ name: '', position: '' }); //Reset the form
  };

  return (
    <form onSubmit={handleSubmit}> {/*Calls handleSubmit when the form is submitted.*/}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={employee.name} // Binds the input value to the name field in the state.
        onChange={handleChange}// Updates the state whenever the user types in the input.
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={employee.position}
        onChange={handleChange}
      />
      <button type="submit">Add Employee</button> 
    </form>
  );
}

export default EmployeeForm; //Makes the EmployeeForm component available for use in other files. 
