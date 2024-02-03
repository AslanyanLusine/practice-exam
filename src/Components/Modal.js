import React, { useState } from 'react';
import UserForm from './UseForm';
import './Modal.css'
const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <h2>Click button place to open </h2>
      <button onClick={openModal}>Open Form</button>
      {isModalOpen && <UserForm closeModal={closeModal}/>
      }
    </div>
  );
};
export default Modal;






