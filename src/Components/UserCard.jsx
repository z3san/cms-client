import { useState } from "react";
import { FaEdit,   FaPhoneAlt, FaTrash } from "react-icons/fa";

import { AiOutlineMail } from "react-icons/ai";
const UserCard = ({ user, onDelete, onUpdate }) => {
  const {
    _id,
    name: initialName,
    email: initialEmail,
    phone: initialPhone,
  } = user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);

  const handleDelete = () => {
    onDelete(_id);
  };
//Update card modal functionality
  const handleUpdate = () => {
    const updatedUserData = {
      name,
      email,
      phone,
    };

    onUpdate(_id, updatedUserData);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* cards */}
      <div className="border p-4 shadow-xl hover:bg-slate-200 rounded-lg m-4 w-64">
        <h3 className="font-bold mb-2"> {name}</h3>
        <div className="flex items-center justify-center gap-1">
          <AiOutlineMail className="" />
          <p className="mb-2"> {email}</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <FaPhoneAlt /> <p>{phone}</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
            onClick={openModal}
          >
            <FaEdit />
          </button>
        </div>

        {/*Update card Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-2">
                Update Contact Information
              </h3>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-2 w-full"
                placeholder="Name"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2 w-full"
                placeholder="Email"
                required
              />
              <input
                type="tel"
                value={phone}
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mb-2 w-full"
                placeholder="Phone Number"
                required
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4 ml-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserCard;
