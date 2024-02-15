import { useState } from 'react';
import AuthUser from '../AuthUser';
import { Link } from 'react-router-dom';

export default function AddFeedback() {
    const { http } = AuthUser();
    const types = ['Backend', 'SQA', 'admin', 'developer'];

    // State variables for form data, validation errors, and submission status
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Form validation function
    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            valid = false;
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
            valid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (validateForm()) {
            try {
                await http.post('/feedback', formData);

                // Clear form data after successful submission
                setFormData({
                    title: '',
                    category: '',
                    description: ''
                });

                // Show success message
                setSuccessMessage('Feedback submitted successfully');
            } catch (error) {
                console.error('Error submitting form:', error);
            } finally {
                setSubmitting(false);
            }
        } else {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    return (

        <div>

            <h1 className='mt-4'>Feedback</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
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
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>
                <Link className="btn btn-primary mx-2" to="/feedback">Back</Link>

                <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}
