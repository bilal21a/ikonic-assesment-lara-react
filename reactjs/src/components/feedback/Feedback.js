import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthUser from '../AuthUser';
import { Link } from 'react-router-dom';

const Feedback = () => {
    const { http } = AuthUser();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const response = await http.get(`/feedback?page=${currentPage}`);
            console.log('response: ', response.data.data);
            setData(response.data.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className=' mt-5'>
            <Link className="btn btn-primary mb-4" to="/addFeedback">Add Feedback</Link>
            <div>

                <table className="table">
                    {/* Render table headers */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Actions</th>
                            {/* Add more headers as needed */}
                        </tr>
                    </thead>
                    {/* Render table body */}
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.category}</td>
                                <td>
                                    {/* Add action buttons or links */}
                                    <button className="btn btn-primary">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                                {/* Add more table data as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => handlePageChange(index + 1)} className="btn btn-secondary">{index + 1}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feedback;
