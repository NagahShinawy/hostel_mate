import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal } from "bootstrap";

const BASE_URL = "http://127.0.0.1:8000/api/persons/";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", city: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = () => {
    axios.get(BASE_URL).then((response) => {
      setPersons(response.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      axios.put(`${BASE_URL}${editId}/`, formData).then(() => {
        fetchPersons();
        setFormData({ name: "", age: "", city: "", email: "", phone: "" });
        setEditId(null);
      });
    } else {
      axios.post(BASE_URL, formData).then(() => {
        fetchPersons();
        setFormData({ name: "", age: "", city: "", email: "", phone: "" });
      });
    }
  };

  const confirmDelete = (id) => {
  setDeleteId(id);
  const modalElement = document.getElementById("deleteModal");
  if (modalElement) {
    const modalInstance = new Modal(modalElement);
    modalInstance.show();
  }
};

  const handleDelete = () => {
    if (deleteId) {
      axios.delete(`${BASE_URL}${deleteId}/`).then(() => {
        setPersons(persons.filter((person) => person.id !== deleteId));
        setDeleteId(null);
      });
    }
  };

  const handleEdit = (person) => {
    setEditId(person.id);
    setFormData(person);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Person Management</h2>

      {/* Add/Edit Person Form */}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
        <h5>{editId ? "Edit Person" : "Add Person"}</h5>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditId(null)}>
            Cancel
          </button>
        )}
      </form>

      {/* Person List Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.city}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(person)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(person.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this person?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
