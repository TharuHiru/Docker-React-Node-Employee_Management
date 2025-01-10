//Import react and hooks from 'react' module
import React, { useState } from 'react';

//Defines the EmployeeTable component.
function EmployeeTable({ employees, deleteEmployee, updateEmployee }) {
  //Tracks the ID of the employee currently being edited
  const [editMode, setEditMode] = useState(null);
  // Stores the details of the employee currently being edited.
  const [editedEmployee, setEditedEmployee] = useState({});

  //Handle the edit button of the table rows
  const handleEdit = (employee) => {
    setEditMode(employee.id);
    setEditedEmployee(employee);
  };

  //Handle the changes of the table rows
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  //handle the update button in the table
  const handleUpdate = () => {
    updateEmployee(editMode, editedEmployee);
    setEditMode(null);
  };

  return (
    <div>
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Maps over the employees array and creates a table row for each employee. */}
            {employees.map((employee) => (
              <tr key={employee.id}>
                {/* If edit mode is on the data showed in text boxes to allow user to edit. or else display as plain text */}
                {editMode === employee.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editedEmployee.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="position"
                        value={editedEmployee.position}
                        onChange={handleChange}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                  </>
                )}
                <td>
                  {editMode === employee.id ? (
                    <>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditMode(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(employee)}>Edit</button>
                      <button onClick={() => deleteEmployee(employee.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeTable;
