import React, { useEffect, useState } from 'react';
import CreateAdminInstance from '../../Axios/adminAxios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';

const UserTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [state, setState] = useState(false);
  const adminAxios = CreateAdminInstance();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    adminAxios.get('/getAllUsers')
      .then((res) => {
        const getUsers = res.data.users;
        setAllUsers(getUsers);
        setFilteredUsers(getUsers); // Initialize filteredUsers with allUsers
      });
  }, [state]);

  const deleteUser = async (userId) => {
    try {
      const response = await adminAxios.delete(`/deleteUser/${userId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setState(!state);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
    setCurrentPage(0); // Reset to the first page when searching
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='w-full overflow-x-auto'>
        <h2 className="text-3xl font-bold mb-3">Users List</h2>

      <div className="w-full">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Name or Email"
            onChange={handleSearch}
            className="p-2 border rounded"
          />
        </div>
        <table className="w-full mt-5">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">isAdmin</th>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr className="bg-white border-b text-gary-200 dark:bg-white dark:border-gray-700" key={user._id}>
                <td className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">{user.name}</td>
                <td className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">{user.email}</td>
                <td className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">{user.isAdmin ? 'Yes' : 'No'}</td>
                <td className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-5">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default UserTable;
