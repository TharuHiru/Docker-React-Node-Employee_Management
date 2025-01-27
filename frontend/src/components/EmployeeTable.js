import React, { useState, useEffect } from 'react'; //manage component state and lifecycle
import axios from 'axios'; // make HTTP Requests
import { useNavigate } from 'react-router-dom'; // help to navigate to different pages
import '../styles/EmployeeTable.css';
import { Helmet } from "react-helmet";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

//functional component employee table
function EmployeeTable() {
  const navigate = useNavigate(); // go back to previous page
  const [editMode, setEditMode] = useState(null); //Tracks which employee is being edited (stores their ID).
  const [editedEmployee, setEditedEmployee] = useState({}); //Stores the details of the employee being edited.
  const [employees, setEmployees] = useState([]); // list of all the employees
  const [searchTerm, setSearchTerm] = useState(''); // search keyword typed by the user
  const [selectedDepartment, setSelectedDepartment] = useState(''); // track the selectef department


  // delete an employee from the given ID
  const deleteEmployee = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/employees/${id}`);
          setEmployees((prev) => prev.filter((employee) => employee._id !== id));

          // Show SweetAlert success dialog
          Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
        } catch (error) {
          console.error(error);
          toast.error('Could not delete the employee. Please try again.');
        }
      }
    });
  };
  
  // Fetch employee data on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on search term and department
  const filteredEmployees = employees.filter((employee) => {
    const nameMatch = `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const departmentMatch = selectedDepartment
      ? employee.department === selectedDepartment
      : true;
    return nameMatch && departmentMatch;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle department filter change
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  //handle the edit mode of the employee crete a table row with input fields
  const handleEdit = (employee) => {
    const editableFields = {
      empId: employee.empId || '',
      firstName: employee.firstName || '',
      lastName: employee.lastName || '',
      address: employee.address || '',
      department: employee.department || '',
      email: employee.email || '',
      mobileNo: employee.mobileNo || '',
      dob: employee.dob ? new Date(employee.dob).toISOString().split('T')[0] : '', // Handle date formatting
      dateOfJoining: employee.dateOfJoining ? new Date(employee.dateOfJoining).toISOString().split('T')[0] : '',
      salary: employee.salary || '',
      designation: employee.designation || '',
    };
    setEditMode(employee._id);
    setEditedEmployee(editableFields);
  };

  //Function for input validation
  const validateInput = (data) => {
    const errors = [];
  
    if (!data.empId || data.empId.trim() === "") {
      errors.push("Employee ID is required.");
    }
    else if (!data.firstName || data.firstName.trim() === "") {
      errors.push("First Name is required.");
    }
    else if (!data.firstName || !/^[A-Za-z]+$/.test(data.firstName)) {
      errors.push("First name must contain only alphabetic characters.");
    }
    else if (!data.lastName || !/^[A-Za-z]+$/.test(data.lastName)) {
      errors.push("Last name must contain only alphabetic characters.");
    }
    else if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push("Valid Email is required.");
    }
    else if (!data.mobileNo || !/^\d{10}$/.test(data.mobileNo)) {
      errors.push("Mobile Number must be 10 digits.");
    }
    else if (!data.salary || data.salary <= 0) {
      errors.push("Salary must be a positive number.");
    }
    else if (!data.department || !["HR", "Finance", "Engineering"].includes(data.department)) {
      errors.push("Department must be one of HR, Finance, Engineering.");
    }
  
    return errors;
  };
  
  // trigger when a use type in the input field
  const handleChange = (e) => {
    const { name, value } = e.target; // get the attribute name and value of the input field
    setEditedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => { // check any required field is empty or not
    const validationErrors = validateInput(editedEmployee);

    //Check if there are any errors
    if (validationErrors.length > 0) {
      toast.error(validationErrors.join("\n"));
      return;
    }

    try { // awaits means wair for servers response
      const response = await axios.put(`http://localhost:5000/api/employees/${editMode}`, editedEmployee); // editMode has the ID of the employee being edited
      if (response.status === 200) // if success then update the employee
      {
        setEmployees((prev) =>
          prev.map((employee) => (employee._id === editMode ? editedEmployee : employee))
        );
        setEditMode(null); // hide the editing mode
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>View Employee | Employee Management System</title>
        <meta name="description" content="Form to add a new employee" />
      </Helmet>
      <button
        type="button"
        onClick={handleBackClick}
        className="back-btn"
        aria-label="Go back to the previous page"
      >
        <span>&larr;</span> Back
      </button>
      <h1 style={{ color: 'white' }}>Employee List</h1>
  
      {/* Search and Filter Section */}
      <div className="employee-search-filter">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="department-select"
        >
          <option value="">All Departments</option>
              {/* list of the departments */}
              {[
                "HR",
                "Finance",
                "Engineering",
              ].map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
  
      <div className="employee-table-container">
        {filteredEmployees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Department</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>DOB</th>
                <th>Date of Joining</th>
                <th>Salary</th>
                <th>Designation</th>
                <th>Profile Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => {
                const isEditing = editMode === employee._id;
                  // edit mode of the table
                return (
                  <tr key={employee._id}>
                    {isEditing ? (
                      <>
                        <td>{editedEmployee.empId}</td>
                        <td>
                          <input
                            type="text"
                            name="firstName"
                            value={editedEmployee.firstName || ''}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="lastName"
                            value={editedEmployee.lastName || ''}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="address"
                            value={editedEmployee.address || ''}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="department"
                            value={editedEmployee.department || ''}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="email"
                            name="email"
                            value={editedEmployee.email || ''}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="mobileNo"
                            value={editedEmployee.mobileNo || ''}
                            onChange={handleChange}
                          />
                        </td>
                        <td>{editedEmployee.dob}</td>
                        <td>{editedEmployee.dateOfJoining}</td>
                        <td>
                          <input
                            type="number"
                            name="salary"
                            value={editedEmployee.salary || ''}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="designation"
                            value={editedEmployee.designation || ''}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            name="photo"
                            onChange={(e) =>
                              setEditedEmployee({
                                ...editedEmployee,
                                photo: e.target.files[0],
                              })
                            }
                          />
                        </td>
                        <td>
                          <button
                            className="update-btn"
                            onClick={handleUpdate}
                          >
                            Save
                          </button>
                          <button
                            className="update-btn cancel-btn"
                            onClick={() => setEditMode(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                      {/* read view of the table */}
                        <td>{employee.empId}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.address}</td>
                        <td>{employee.department}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobileNo}</td>
                        <td>{employee.dob}</td>
                        <td>{employee.dateOfJoining}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.designation}</td>
                        <td>
                          <img
                            src={`http://localhost:5000/uploads/${employee.photo}`}
                            alt="Profile"
                            className="profile-photo"
                          />
                        </td>
                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(employee)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => deleteEmployee(employee._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}  

export default EmployeeTable; //export the component
