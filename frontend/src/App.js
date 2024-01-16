import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Form from './components/form/Form';
import DataTable from './components/dataTable/DataTable';
import RecordDetails from './components/recordDetails/RecordDetails';
import './index.css'

const App = () => {
    return (
        <BrowserRouter>
            <nav className="NavBar">
                <Link className="NavLink" to="/">Home</Link>
                <Link className="NavLink" to="/records">All Records</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Form />}/>
                <Route path="/records" element={<DataTable />}/>
                <Route path="/records/:id" element={<RecordDetails/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
