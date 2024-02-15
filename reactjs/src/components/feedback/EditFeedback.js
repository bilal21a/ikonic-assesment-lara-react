import { useState, useEffect } from 'react';
import AuthUser from '../AuthUser';
import { Link, useParams } from 'react-router-dom';

export default function EditFeedback() {
    const { http } = AuthUser();
    const { id } = useParams();
    const types = ['Backend', 'SQA', 'admin', 'developer'];

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (id) {
            // Fetch feedback data for editing if id exists
            fetchFeedbackData();
        }
    }, [id]);

    const fetchFeedbackData = async () => {
        try {
            const response = await http.get(`/feedback/${id}/edit`);
            setFormData(response.data.data);
            console.log('response.data: ', response.data);
        } catch (error) {
            console.error('Error fetching feedback data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await http.put(`/feedback/${id}`, updatedFormData);
            setSuccessMessage('Feedback submitted successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h1 className='mt-4'>{id ? 'Edit Feedback' : 'Add Feedback'}</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title && <div className="text-danger">{errors.title}</div>}
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="category">Category</label>
                    <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Types</option>
                        {types.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    {errors.category && <div className="text-danger">{errors.category}</div>}
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>
                <Link className="btn btn-primary mx-2" to="/feedback">Back</Link>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Save'}
                </button>
            </form>
        </div>
    );
}
