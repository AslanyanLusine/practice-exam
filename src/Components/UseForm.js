
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './UseForm.css'

const url = 'http://localhost:8000/users'; 

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),


});

const UserForm = (closeModal) => {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
  
    axios.get(url)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error users:', error));
  }, []);

  const handleDelete = (id) => {
   
    axios.delete(`${url}/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleSubmit = (values, { resetForm }) => {// in submit time it must be closed and
                                                   // form must be cleaned, but that part didn't work
    axios.post(url, values)
      .then(response => {
        setUsers( [...users, response.data]);
        closeModal()
        resetForm();
      })
      .catch(error => console.error('Error adding user:', error));
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email:"" 
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />

          <label htmlFor="email">Email</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />

          <label htmlFor="textArea"> Text Area</label>
          <Field name="message" as="textarea" className= 'form-textarea'/>
 




          
          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
