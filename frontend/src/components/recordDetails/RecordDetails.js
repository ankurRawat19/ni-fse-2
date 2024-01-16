import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Typography, Button, TextField, CircularProgress} from '@material-ui/core';
import api from '../../services/api';
import './style.css';
import {unstable_renderSubtreeIntoContainer} from "react-dom";

const RecordDetails = () => {
    const {id} = useParams();
    const [record, setRecord] = useState({});
    const [editing, setEditing] = useState(false);
    const [updatedRecord, setUpdatedRecord] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fetchRecordDetails = async () => {
        try {
            const response = await api.get(`/id_recordId?id=${id}`);
            setRecord(response.data);
        } catch (error) {
            setError('Error fetching record details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecordDetails();
    }, [id]);

    const handleEditClick = () => {
        setEditing(true);
        setUpdatedRecord({...record});
    };

    const handleSaveClick = async () => {
        try {
            setLoading(true);
            await api.put(`id_recordId?id=${id}`, updatedRecord);
            setEditing(false);
            await fetchRecordDetails();
        } catch (error) {
            console.error('Error updating record:', error);
            setError('Error updating record. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setUpdatedRecord({...updatedRecord, [e.target.name]: e.target.value});
    };

    return (
        <div className="RecordDetails">
            <Typography variant="h4" className="det-header">Record Details</Typography>
            {loading ? (
                <CircularProgress/>
            ) : (
                <>
                    {editing ? (
                        <div>
                            <TextField
                                className="userData"
                                label="First Name"
                                name="firstName"
                                value={updatedRecord.firstName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                className="userData"
                                label="Last Name"
                                name="lastName"
                                value={updatedRecord.lastName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                className="userData"
                                label="Email"
                                name="email"
                                value={updatedRecord.email}
                                onChange={handleInputChange}
                            />
                            <TextField
                                className="userData"
                                label="Phone"
                                name="phone"
                                value={updatedRecord.phone}
                                onChange={handleInputChange}
                            /><br/>
                            <Button type="submit" className="EditButton" onClick={handleSaveClick} disabled={loading}>
                                {loading ? <CircularProgress size={24}/> : 'Save'}
                            </Button>
                            {error && <p className="error">{error}</p>}
                        </div>
                    ) : (
                        <div>
                            <Typography className="userData">{`First Name: ${record.firstName}`}</Typography>
                            <Typography className="userData">{`Last Name: ${record.lastName}`}</Typography>
                            <Typography className="userData">{`Email: ${record.email}`}</Typography>
                            <Typography className="userData">{`Phone: ${record.phone}`}</Typography>
                            <Button type="submit" className="EditButton" onClick={handleEditClick} disabled={loading}>
                                {loading ? <CircularProgress size={24}/> : 'Edit'}
                            </Button>
                            {error && <p className="error">{error}</p>}
                        </div>
                    )}
                </>
                )
            }
        </div>
    );
};

export default RecordDetails;
