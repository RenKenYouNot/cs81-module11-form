import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// The ContactForm component handles all the form logic and display.
// It uses controlled components and state to manage user input,
// validate data, and display the results.
const ContactForm = () => {
  // State for storing the form's input values.
  // The initial state matches the names of the form fields.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State to store the data after a successful submission.
  // It is initially null and only set after validation passes.
  const [submittedData, setSubmittedData] = useState(null);

  // State to hold any validation errors.
  // Keys will correspond to the form field names (e.g., 'name', 'email').
  const [errors, setErrors] = useState({});

  // This function updates the formData state as the user types.
  // It's a key part of making the form components "controlled".
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // The validation function checks for required fields and a valid email format.
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    // Simple email validation: check for the '@' symbol.
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    return newErrors;
  };

  // This function is called when the form is submitted.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default browser form submission behavior.

    const validationErrors = validate();

    // Check if there are any errors.
    if (Object.keys(validationErrors).length === 0) {
      // If no errors, set the submitted data, clear the form, and clear errors.
      setSubmittedData(formData);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      // If there are errors, update the errors state to display them to the user.
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-1">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        {submittedData && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Submitted Data:</h3>
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

// The main App component renders the ContactForm.
const App = () => {
  return (
    <div className="App">
      <ContactForm />
    </div>
  );
};

export default App;