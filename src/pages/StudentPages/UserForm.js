import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Header.css';

const UserForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      title: '',
      profile_picture: '',
      gender: '',
      nationality: '',
      religion: '',
      date_of_birth: '',
      blood_group: '',
      phone_number: '',
      secondary_phone_number: '',
      current_address: '',
      permanent_address: '',
      is_active: false,
      is_staff: false,
      college: '',
      intermediate_board: '',
      intermediate_number: '',
      matriculation_board: '',
      matriculation_number: '',
      previous_degree: '',
      school: '',
      user_type: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
      // Add more validation rules as needed
    }),
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
     <label htmlFor="first_name">First Name</label>
      <input
        id="first_name"
        name="first_name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.first_name}
      />

      <label htmlFor="last_name">Last Name</label>
      <input
        id="last_name"
        name="last_name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.last_name}
      />
      {/* Username Field */}
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <div>{formik.errors.username}</div>
      ) : null}

      {/* Email Field */}
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      {/* Password Field */}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      {/* Other Fields */}
      

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />

      <label htmlFor="gender">Gender</label>
      <input
        id="gender"
        name="gender"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.gender}
      />

      <label htmlFor="nationality">Nationality</label>
      <input
        id="nationality"
        name="nationality"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.nationality}
      />

      <label htmlFor="religion">Religion</label>
      <input
        id="religion"
        name="religion"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.religion}
      />

      <label htmlFor="date_of_birth">Date of Birth</label>
      <input
        id="date_of_birth"
        name="date_of_birth"
        type="date"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.date_of_birth}
      />

      <label htmlFor="blood_group">Blood Group</label>
      <input
        id="blood_group"
        name="blood_group"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.blood_group}
      />

      <label htmlFor="phone_number">Phone Number</label>
      <input
        id="phone_number"
        name="phone_number"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone_number}
      />

      <label htmlFor="secondary_phone_number">Secondary Phone Number</label>
      <input
        id="secondary_phone_number"
        name="secondary_phone_number"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.secondary_phone_number}
      />

      <label htmlFor="current_address">Current Address</label>
      <textarea
        id="current_address"
        name="current_address"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.current_address}
      />

      <label htmlFor="permanent_address">Permanent Address</label>
      <textarea
        id="permanent_address"
        name="permanent_address"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.permanent_address}
      />

      <label htmlFor="is_active">Is Active</label>
      <input
        id="is_active"
        name="is_active"
        type="checkbox"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        checked={formik.values.is_active}
      />

      <label htmlFor="is_staff">Is Staff</label>
      <input
        id="is_staff"
        name="is_staff"
        type="checkbox"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        checked={formik.values.is_staff}
      />

      <label htmlFor="college">College</label>
      <input
        id="college"
        name="college"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.college}
      />

      <label htmlFor="intermediate_board">Intermediate Board</label>
      <input
        id="intermediate_board"
        name="intermediate_board"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.intermediate_board}
      />

      <label htmlFor="intermediate_number">Intermediate Number</label>
      <input
        id="intermediate_number"
        name="intermediate_number"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.intermediate_number}
      />

      <label htmlFor="matriculation_board">Matriculation Board</label>
      <input
        id="matriculation_board"
        name="matriculation_board"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.matriculation_board}
      />

      <label htmlFor="matriculation_number">Matriculation Number</label>
      <input
        id="matriculation_number"
        name="matriculation_number"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.matriculation_number}
      />

      <label htmlFor="previous_degree">Previous Degree</label>
      <input
        id="previous_degree"
        name="previous_degree"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.previous_degree}
      />

      <label htmlFor="school">School</label>
      <input
        id="school"
        name="school"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.school}
      />

      <label htmlFor="user_type">User Type</label>
      <input
        id="user_type"
        name="user_type"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.user_type}
      />
       {/* Profile Picture Field */}
       <label htmlFor="profile_picture">Profile Picture</label>
      <input
        id="profile_picture"
        name="profile_picture"
        type="file"
        onChange={(event) => {
          formik.setFieldValue("profile_picture", event.currentTarget.files[0]);
        }}
        onBlur={formik.handleBlur}
      />
      {formik.touched.profile_picture && formik.errors.profile_picture ? (
        <div>{formik.errors.profile_picture}</div>
      ) : null}


      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
