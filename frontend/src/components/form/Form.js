import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import api from '../../services/api';
import './style.css';

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Basic validation
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
                setError('All fields are required.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setError('Invalid email format.');
                return;
            }

            const phoneRegex = /^\d+$/;
            if (!phoneRegex.test(formData.phone)) {
                setError('Phone number should contain only numeric characters.');
                return;
            }

            setLoading(true);

            const userId = uuidv4();
            const updatedFormData = { ...formData, userId };

            await api.post('/save', updatedFormData);

            setSuccessMessage('User added successfully');
            setFormData({ firstName: '', lastName: '', email: '', phone: '' });
            setError('');
            // Clear the form data
            setTimeout(() => {
                setSuccessMessage('');
            }, 1000);
        } catch (error) {
            console.error('Error saving form data:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="content">
            <form className="Form" onSubmit={handleSubmit}>
                <TextField
                    className="inputs"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <TextField
                    className="inputs"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <TextField
                    className="inputs"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    className="inputs"
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <Button type="submit" className="submitButton" disabled={loading}>
                    {loading ? <CircularProgress size={24} data-testid="loading-spinner"/> : 'Submit'}
                </Button>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </form>
        </div>
    );
};

export default Form;
