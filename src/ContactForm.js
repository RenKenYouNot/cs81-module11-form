import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:<br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
        </label><br /><br />

        <label>Email:<br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
        </label><br /><br />

        <label>Message:<br />
          <textarea name="message" rows="5" value={formData.message} onChange={handleChange}></textarea>
          {errors.message && <p style={{color: 'red'}}>{errors.message}</p>}
        </label><br /><br />

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ContactForm;