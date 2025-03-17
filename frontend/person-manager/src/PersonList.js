import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/persons/";

const PersonForm = ({ selectedPerson, fetchPersons }) => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        city: "",
        email: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});

    // Reset form data when selectedPerson changes
    useEffect(() => {
        if (selectedPerson) {
            setFormData(selectedPerson);
        } else {
            setFormData({
                name: "",
                age: "",
                city: "",
                email: "",
                phone: "",
            });
        }
    }, [selectedPerson]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset previous errors

        try {
            if (selectedPerson) {
                // Update existing person
                await axios.put(`${BASE_URL}${selectedPerson.id}/`, formData);
            } else {
                // Add new person
                await axios.post(BASE_URL, formData);
            }
            fetchPersons(); // Refresh the list
            setFormData({ name: "", age: "", city: "", email: "", phone: "" }); // Reset form after submission
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("Backend Validation Errors:", error.response.data); // Log the error details
                const formattedErrors = {};
                for (let field in error.response.data) {
                    formattedErrors[field] = error.response.data[field][0]; // Display the first error for each field
                }
                setErrors(formattedErrors);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            {/* Name Field */}
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            {/* Age Field */}
            <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                    type="number"
                    name="age"
                    className={`form-control ${errors.age ? "is-invalid" : ""}`}
                    value={formData.age}
                    onChange={handleChange}
                />
                {errors.age && <div className="invalid-feedback">{errors.age}</div>}
            </div>

            {/* City Field */}
            <div className="mb-3">
                <label className="form-label">City</label>
                <input
                    type="text"
                    name="city"
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    value={formData.city}
                    onChange={handleChange}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>

            {/* Email Field */}
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Phone Field */}
            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                    type="text"
                    name="phone"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    value={formData.phone}
                    onChange={handleChange}
                />
                {errors.phone && (
                    <div className="invalid-feedback">
                        {errors.phone} {/* Display the phone validation error */}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
                {selectedPerson ? "Update Person" : "Add Person"}
            </button>
        </form>
    );
};

export default PersonForm;