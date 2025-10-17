import { useState } from "react";
import "./RegistrationForm.css";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    course: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    switch (name) {
      case "firstName":
        return !value.trim() ? "First name is required" : "";
      case "lastName":
        return !value.trim() ? "Last name is required" : "";
      case "email":
        if (!value.trim()) return "Email is required";
        return !emailRegex.test(value) ? "Enter a valid email address" : "";
      case "age": {
        if (!value) return "Age is required";
        const ageNum = parseInt(value, 10);
        if (ageNum < 18) return "Must be at least 18 years old";
        if (ageNum > 120) return "Please enter a valid age";
        return "";
      }
      case "course":
        return !value ? "Please select a course" : "";
      default:
        return "";
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      age: true,
      course: true,
    });

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      setIsSubmitted(true);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        course: "",
      });
      setTouched({});

      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        <div className="form-header">
          <h2 className="form-title">Course Registration</h2>
          <p className="form-subtitle">Join us today and start learning</p>
        </div>

        {isSubmitted && (
          <div className="success-alert">
            <span className="success-icon">✓</span>
            <div>
              <p className="success-title">Registration successful!</p>
              <p className="success-text">
                Welcome aboard, {formData.firstName}!
              </p>
            </div>
          </div>
        )}

        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name <span className="required">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${
                errors.firstName && touched.firstName ? "input-error" : ""
              }`}
              placeholder="John"
            />
            {errors.firstName && touched.firstName && (
              <p className="error-message">⚠ {errors.firstName}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name <span className="required">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${
                errors.lastName && touched.lastName ? "input-error" : ""
              }`}
              placeholder="Doe"
            />
            {errors.lastName && touched.lastName && (
              <p className="error-message">⚠ {errors.lastName}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${
                errors.email && touched.email ? "input-error" : ""
              }`}
              placeholder="john@example.com"
            />
            {errors.email && touched.email && (
              <p className="error-message">⚠ {errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Age <span className="required">*</span>
            </label>
            <input
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${
                errors.age && touched.age ? "input-error" : ""
              }`}
              placeholder="18"
              min="18"
              max="120"
            />
            {errors.age && touched.age && (
              <p className="error-message">⚠ {errors.age}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="course" className="form-label">
              Course <span className="required">*</span>
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${
                errors.course && touched.course ? "input-error" : ""
              }`}
            >
              <option value="">Select a course</option>
              <option value="React Basics">React Basics</option>
              <option value="Node.js Fundamentals">Node.js Fundamentals</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
            {errors.course && touched.course && (
              <p className="error-message">⚠ {errors.course}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`submit-button ${isLoading ? "button-loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="help-text">
          All fields marked with <span className="required">*</span> are
          required
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;
