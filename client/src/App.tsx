import React, { useState } from 'react';

function App() {
  // Initial data
  const initialEmployees = [
    { id: 1, name: 'Jane Doe', role: 'Developer', department: 'Engineering', salary: 85000 },
    { id: 2, name: 'John Smith', role: 'Designer', department: 'Design', salary: 75000 },
    { id: 3, name: 'Sarah Johnson', role: 'Manager', department: 'Engineering', salary: 110000 },
  ];

  const initialProjects = [
    { id: 1, name: 'Website Redesign', deadline: '2023-12-15', budget: 25000, status: 'In Progress' },
    { id: 2, name: 'Mobile App', deadline: '2024-03-30', budget: 80000, status: 'Planning' },
  ];

  const initialAssignments = [
    { id: 1, employeeId: 1, projectId: 1 },
    { id: 2, employeeId: 2, projectId: 1 },
    { id: 3, employeeId: 3, projectId: 1 },
    { id: 4, employeeId: 1, projectId: 2 },
  ];

  // State
  const [employees, setEmployees] = useState(initialEmployees);
  const [projects, setProjects] = useState(initialProjects);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [activeTab, setActiveTab] = useState('employees');
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  // CRUD operations for employees
  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1
    };
    console.log(newEmployee);
    
    setEmployees([...employees, newEmployee]);
    resetForm();
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    resetForm();
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    // Also remove any assignments for this employee
    setAssignments(assignments.filter(a => a.employeeId !== id));
  };

  // CRUD operations for projects
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1
    };
    setProjects([...projects, newProject]);
    resetForm();
  };

  const updateProject = (updatedProject) => {
    setProjects(projects.map(proj => 
      proj.id === updatedProject.id ? updatedProject : proj
    ));
    resetForm();
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(proj => proj.id !== id));
    // Also remove any assignments for this project
    setAssignments(assignments.filter(a => a.projectId !== id));
  };

  // Assignment operations
  const addAssignment = (assignment) => {
    // Check if assignment already exists
    const exists = assignments.some(
      a => a.employeeId === assignment.employeeId && a.projectId === assignment.projectId
    );
    
    if (!exists) {
      const newAssignment = {
        ...assignment,
        id: assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1
      };
      setAssignments([...assignments, newAssignment]);
    }
    resetForm();
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'employees') {
      if (editingId) {
        updateEmployee({ ...formData, id: editingId });
      } else {
        addEmployee(formData);
      }
    } else if (activeTab === 'projects') {
      if (editingId) {
        updateProject({ ...formData, id: editingId });
      } else {
        addProject(formData);
      }
    } else if (activeTab === 'assignments') {
      addAssignment({
        employeeId: parseInt(formData.employeeId),
        projectId: parseInt(formData.projectId)
      });
    }
  };

  const startEditing = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const resetForm = () => {
    setFormData({});
    setEditingId(null);
  };

  // Get employee and project names for assignments display
  const getEmployeeName = (id) => {
    const employee = employees.find(e => e.id === id);
    return employee ? employee.name : 'Unknown';
  };

  const getProjectName = (id) => {
    const project = projects.find(p => p.id === id);
    return project ? project.name : 'Unknown';
  };

  // Render functions
  const renderEmployeeForm = () => (
    <form onSubmit={handleSubmit} className="form-control w-full max-w-md p-4 bg-base-200 rounded-lg">
      <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Employee' : 'Add Employee'}</h3>
      
      <div className="mb-4">
        <label className="label">Name</label>
        <input 
          type="text" 
          name="name"
          value={formData.name || ''} 
          onChange={handleInputChange}
          className="input input-bordered w-full" 
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="label">Role</label>
        <input 
          type="text" 
          name="role"
          value={formData.role || ''} 
          onChange={handleInputChange}
          className="input input-bordered w-full" 
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="label">Department</label>
        <input 
          type="text" 
          name="department"
          value={formData.department || ''} 
          onChange={handleInputChange}
          className="input input-bordered w-full" 
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="label">Salary</label>
        <input 
          type="number" 
          name="salary"
          value={formData.salary || ''} 
          onChange={handleInputChange}
          className="input input-bordered w-full" 
          required
        />
      </div>
      
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} className="btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );

  const renderProjectForm = () => (
    <form onSubmit={handleSubmit} className="form-control w-full max-w-md p-4 bg-base-200 rounded-lg">
      <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Project' : 'Add Project'}</h3>
      
      <div className="mb-4">
        <label className="label">Name</label>
        <input 
          type="text" 
          name="name"
          value={formData.name || ''} 
          onChange={handleInputChange}
          className="input input-bordered w-full" 
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="label">Deadline</label>
        <input 
          type="date" 
          name="deadline"
          value={formData.deadline || ''} 
          onChange={handleInputChange}
          className="input input-bordered w-full" 
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="label">Budget</label>
        <input 
          type="number" 
          name="budget"
          value={formData.budget || ''} 
          onChange={handleInputChange}
          className="input input-bordered w-full" 
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="label">Status</label>
        <select 
          name="status"
          value={formData.status || ''} 
          onChange={handleInputChange}
          className="select select-bordered w-full" 
          required
        >
          <option value="">Select Status</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} className="btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );

  const renderAssignmentForm = () => (
    <form onSubmit={handleSubmit} className="form-control w-full max-w-md p-4 bg-base-200 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Assign Employee to Project</h3>
      
      <div className="mb-4">
        <label className="label">Employee</label>
        <select 
          name="employeeId"
          value={formData.employeeId || ''} 
          onChange={handleInputChange}
          className="select select-bordered w-full" 
          required
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="label">Project</label>
        <select 
          name="projectId"
          value={formData.projectId || ''} 
          onChange={handleInputChange}
          className="select select-bordered w-full" 
          required
        >
          <option value="">Select Project</option>
          {projects.map(proj => (
            <option key={proj.id} value={proj.id}>{proj.name}</option>
          ))}
        </select>
      </div>
      
      <button type="submit" className="btn btn-primary">
        Assign
      </button>
    </form>
  );

  const renderEmployees = () => (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.department}</td>
              <td>${emp.salary.toLocaleString()}</td>
              <td className="flex gap-2">
                <button onClick={() => startEditing(emp)} className="btn btn-sm">Edit</button>
                <button onClick={() => deleteEmployee(emp.id)} className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderProjects = () => (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Deadline</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(proj => (
            <tr key={proj.id}>
              <td>{proj.id}</td>
              <td>{proj.name}</td>
              <td>{proj.deadline}</td>
              <td>${proj.budget.toLocaleString()}</td>
              <td><span className={`badge ${proj.status === 'Completed' ? 'badge-success' : proj.status === 'In Progress' ? 'badge-info' : proj.status === 'On Hold' ? 'badge-warning' : 'badge-ghost'}`}>{proj.status}</span></td>
              <td className="flex gap-2">
                <button onClick={() => startEditing(proj)} className="btn btn-sm">Edit</button>
                <button onClick={() => deleteProject(proj.id)} className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAssignments = () => (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Project</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => (
            <tr key={assignment.id}>
              <td>{assignment.id}</td>
              <td>{getEmployeeName(assignment.employeeId)}</td>
              <td>{getProjectName(assignment.projectId)}</td>
              <td>
                <button onClick={() => deleteAssignment(assignment.id)} className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Company Dashboard</h1>
      
      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <button
          className={`tab ${activeTab === 'employees' ? 'tab-active' : ''}`}
          onClick={() => {setActiveTab('employees'); resetForm();}}
        >
          Employees
        </button>
        <button
          className={`tab ${activeTab === 'projects' ? 'tab-active' : ''}`}
          onClick={() => {setActiveTab('projects'); resetForm();}}
        >
          Projects
        </button>
        <button
          className={`tab ${activeTab === 'assignments' ? 'tab-active' : ''}`}
          onClick={() => {setActiveTab('assignments'); resetForm();}}
        >
          Assignments
        </button>
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Form */}
        <div className="lg:col-span-1">
          {activeTab === 'employees' && renderEmployeeForm()}
          {activeTab === 'projects' && renderProjectForm()}
          {activeTab === 'assignments' && renderAssignmentForm()}
        </div>
        
        {/* Right column: Table */}
        <div className="lg:col-span-2">
          {activeTab === 'employees' && renderEmployees()}
          {activeTab === 'projects' && renderProjects()}
          {activeTab === 'assignments' && renderAssignments()}
        </div>
      </div>
    </div>
  );
}

export default App;