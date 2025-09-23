import { useState, useEffect } from "react";
import { apiAdmin } from "../../../api/axiosInstance";
import { FormatDateFull } from "../../../utility/function";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    rePassword: "",
    role: "admin",
  });

  //----------------------------------------------------------------------------------------
  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await apiAdmin.get("/users");
      if (res.status === 200) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("โหลดรายชื่อผู้ใช้ไม่สำเร็จ");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  //----------------------------------------------------------------------------------------

  // submit new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.rePassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }
    try {
      await apiAdmin.post("/auth/register", {
        username: form.username,
        password: form.password,
        role: form.role,
      });
      toast.success("เพิ่มผู้ใช้สำเร็จ");
      setForm({ username: "", password: "", rePassword: "", role: "admin" });
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาด");
    }
  };
  // delete user
  const deleteUser = async (id) => {
    if (!window.confirm("คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?")) return;
    try {
      await apiAdmin.delete(`/users/${id}`);
      toast.success("ลบผู้ใช้แล้ว");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("ลบผู้ใช้ไม่สำเร็จ");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 max-w-[1500px]">
        {/* ✨ Add User Form */}
        <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md overflow-auto row-span-1 mb-3">
          <legend className="fieldset-legend text-2xl text-sky-900">
            เพิ่มผู้ใช้
          </legend>
          <form onSubmit={handleSubmit} className="space-y-3 w-[80%] m-auto ">
            <div>
              <p className="text-lg">Username</p>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                className="bg-amber-50 border border-sky-700 rounded mt-2 px-2 w-full text-md text-lg"
                required
              />
            </div>
            <div>
              <p className="text-lg">Password</p>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="bg-amber-50 border border-sky-700 rounded mt-2 px-2 w-full text-md text-lg"
                required
              />
            </div>
            <div>
              <p className="text-lg">Re-enter password</p>
              <input
                name="rePassword"
                type="password"
                value={form.rePassword}
                onChange={handleChange}
                className="bg-amber-50 border border-sky-700 rounded mt-2 px-2 w-full text-md text-lg"
                required
              />
            </div>

            <div>
              <p className="text-lg">Role</p>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="bg-amber-50 border border-sky-700 rounded mt-2 px-2 w-full text-md text-lg h-[30.47px]">
                <option value="stuff">stuff</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-sky-700 text-white px-5 py-2 rounded hover:bg-sky-700 cursor-pointer text-lg">
                ยืนยัน
              </button>
            </div>
          </form>
        </fieldset>

        {/* ✨ User List Table */}
        <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md overflow-auto row-span-1 mb-3">
          <legend className="fieldset-legend text-2xl text-sky-900">
            รายชื่อผู้ใช้
          </legend>
          <table className="table w-full text-center">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Created At</th>
                <th>Role</th>
                <th>Tool</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-2">
                    ไม่มีผู้ใช้
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.user_id} className="hover:bg-gray-50 even:bg-amber-50">
                    <td>{u.user_id}</td>
                    <td>{u.username}</td>
                    <td>{FormatDateFull(u.created_at)}</td>
                    <td>{u.role}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(u.user_id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        title="ลบผู้ใช้">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </fieldset>
      </div>
    </>
  );
}
