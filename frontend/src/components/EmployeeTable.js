import React, { useState } from 'react';

function EmployeeTable({ employees, deleteEmployee, updateEmployee }) {
  const [editMode, setEditMode] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});

  const handleEdit = (employee) => {
    setEditMode(employee.id);
    setEditedEmployee(employee);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

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
            {employees.map((employee) => (
              <tr key={employee.id}>
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
