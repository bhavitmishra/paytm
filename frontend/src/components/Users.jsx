import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const resp = await axios.get(
          "http://localhost:3000/api/v1/user/?filter=" + search,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            params: {
              username: username,
            },
          }
        );
        setUsers(resp.data.User); // assuming resp.data.User contains the array
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [setSearch, search]);

  return (
    <div>
      <div className="font-bold text-2xl px-6 pb-3 pt-10">Users</div>
      <div className="px-6 pb-6">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="Search Users..."
          className="w-full px-6 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {users.map((user) => (
        <div
          key={user.username}
          className="flex justify-between items-center px-4 py-2 text-black"
        >
          {/* Left Side: Icon + Name */}
          <div className="flex items-center gap-2 text-lg font-semibold">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-cyan-800 flex items-center justify-center font-bold">
              {user.firstName[0]}
            </div>
            <span>
              {" "}
              {user.firstName} {user.lastName}
            </span>
          </div>

          {/* Right Side: Button */}
          <div>
            <button
              onClick={() => {
                navigate(
                  `/send?firstname=${user.firstName}&lastname=${user.lastName}&id=${user.userid}`
                );
              }}
              className="bg-indigo-950 hover:bg-black text-white px-3 py-1 rounded"
            >
              Send Money
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
