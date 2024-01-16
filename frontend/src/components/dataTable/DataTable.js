import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import api from "../../services/api";
import './style.css'

const DataTable = () => {
    const [records, setRecords] = useState([]);
    const fetchRecords = async () => {
        try {
            const response = await api.get('/id');
            console.log("response.data : ",response.data)
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    useEffect(() => {
        fetchRecords()
    }, []);

    return (
        <TableContainer component={Paper} className="TableContainer">
            <Table className="Table">
                <TableHead>
                    <TableRow>
                        <TableCell className="Th">First Name</TableCell>
                        <TableCell className="Th">Last Name</TableCell>
                        <TableCell className="Th">Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records ? records.map((record) => {
                        return (
                        <TableRow key={record.userId}>
                            <TableCell className="Td">
                                <Link className="data" to={`/records/${record.userId}`}>
                                    {record.firstName}
                                </Link>
                            </TableCell>
                            <TableCell className="Td">
                                <Link className="data" to={`/records/${record.userId}`}>
                                    {record.lastName}
                                </Link>
                            </TableCell>
                            <TableCell className="Td">
                                <Link className="data" to={`/records/${record.userId}`}>
                                    {record.phone}
                                </Link>
                            </TableCell>
                        </TableRow>
                    )}) : <div>Loading ....</div>}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
