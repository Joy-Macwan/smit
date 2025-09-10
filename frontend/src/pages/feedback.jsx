import React, { useState, useEffect } from "react";
// Using shared motion/marketing styles; page-specific CSS removed
import Sidebar from '../components/sidebar';

const Feedback = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = "User Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Feedback Submitted:", formData);
      setSuccessMessage("Thank you for your feedback!");
      setErrorMessage("");
      setFormData({
        userName: "",
        email: "",
        feedback: "",
      });
    } else {
      setSuccessMessage("");
      setErrorMessage("Please correct the highlighted errors.");
    }
  };

  return (
    <div>
  <Sidebar />
      <div className="section">
        <form onSubmit={handleSubmit} style={{maxWidth:'480px', margin:'0 auto'}}>
          <div className="card scale-in">
            <h2 style={{textAlign:'center'}}>Feedback Form</h2>

            <div className="form-group reveal-up in">
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
              <label className={formData.userName ? "filled" : ""}>User Name</label>
              {errors.userName && <span className="error">{errors.userName}</span>}
            </div>

            <div className="form-group reveal-up in">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label className={formData.email ? "filled" : ""}>Email ID</label>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group reveal-up in">
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
              />
              <label className={formData.feedback ? "filled" : ""}>Description</label>
              {errors.feedback && <span className="error">{errors.feedback}</span>}
            </div>

            {successMessage && <div className="success">{successMessage}</div>}
            {errorMessage && <div className="error">{errorMessage}</div>}

            <button type="submit" className="btn btn-lg cta lift" style={{width:'100%'}}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
