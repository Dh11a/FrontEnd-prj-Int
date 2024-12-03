import { FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <main className="ml-20 flex-grow bg-gray-100 p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Administrator Profile</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleLogout} // Call handleLogout when clicking the logout button
          >
            Logout
          </button>
        </header>
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-4xl">
              <FaUserCog />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Administrator Name</h2>
              <p>Administrator</p>
              <p>Email: admin@gmail.com</p>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg">
            <h3 className="font-semibold">Manage Users</h3>
            <p>View, add, edit, or remove users.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg">
            <h3 className="font-semibold">View Reports</h3>
            <p>Generate and review reports.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg">
            <h3 className="font-semibold">Settings</h3>
            <p>Manage system settings.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminProfile;
