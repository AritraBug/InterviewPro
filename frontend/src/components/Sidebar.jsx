import {
  FaChartPie,
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaSignOutAlt,
  FaUserCircle
} from "react-icons/fa";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  removeToken
} from "../utils/storage";

function Sidebar() {

  const navigate =
    useNavigate();
const handleLogout = () => {

  removeToken();

  navigate("/");

};
  return (

    <div
      className="
        w-64
        min-h-screen
        p-6
        flex
        flex-col
      "
      style={{
        backgroundColor: "#71A5DE"
      }}
    >

      <h1
        className="
          text-3xl
          font-bold
          text-white
          mb-10
        "
      >
        InterviewPro
      </h1>

      <nav
        className="
          flex
          flex-col
          gap-3
        "
      >

        <Link
          to="/dashboard"
          className="
            flex
            items-center
            gap-3
            text-white
            p-3
            rounded-xl
            hover:bg-white/20
            transition
          "
        >
          <FaChartPie />
          Dashboard
        </Link>

        <Link
          to="/candidates"
          className="
            flex
            items-center
            gap-3
            text-white
            p-3
            rounded-xl
            hover:bg-white/20
            transition
          "
        >
          <FaUsers />
          Candidates
        </Link>

        <Link
          to="/interviews"
          className="
            flex
            items-center
            gap-3
            text-white
            p-3
            rounded-xl
            hover:bg-white/20
            transition
          "
        >
          <FaCalendarAlt />
          Interviews
        </Link>

        <Link
          to="/feedbacks"
          className="
            flex
            items-center
            gap-3
            text-white
            p-3
            rounded-xl
            hover:bg-white/20
            transition
          "
        >
          <FaClipboardList />
          Feedbacks
        </Link>

      </nav>

      <div className="mt-auto">

        <div
          className="
            flex
            items-center
            gap-3
            text-white
            mb-4
          "
        >
          <FaUserCircle size={28} />

          <div>

            <p className="font-semibold">
              Admin User
            </p>

            <p className="text-sm opacity-80">
              Administrator
            </p>

          </div>

        </div>

        <button onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-white
            text-blue-600
            p-3
            rounded-xl
            font-semibold
            hover:bg-slate-100
            transition
          "
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>

  );
}

export default Sidebar;