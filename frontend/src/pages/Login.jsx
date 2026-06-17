import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";

import { loginUser } from "../services/authService";
import { saveToken } from "../utils/storage";
function Login() {
    const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);
    setError("");

    const response =
      await loginUser(
        email,
        password
      );

    saveToken(
      response.token
    );

    navigate("/dashboard");

  } catch (err) {

  console.log(err);

  setError(
    "Invalid email or password"
  );



  } finally {

    setLoading(false);

  }
};

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="flex flex-col items-center">

          <div
            className="
              h-16
              w-16
              rounded-full
              flex
              items-center
              justify-center
              mb-4
            "
            style={{
              backgroundColor: "#71A5DE",
            }}
          >
            <FaUserTie
              size={28}
              color="white"
            />
          </div>

          <h1
            className="
              text-3xl
              font-bold
              text-slate-800
            "
          >
            InterviewPro
          </h1>

          <p
            className="
              text-slate-500
              mt-2
            "
          >
            Interview Management System
          </p>

        </div>

        <form
  className="mt-8"
  onSubmit={handleSubmit}
>

          <div className="mb-5">

            <label
              className="
                block
                text-sm
                font-medium
                text-slate-700
                mb-2
              "
            >
              Email
            </label>

            <input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  className="
    w-full
    border
    border-slate-300
    rounded-xl
    px-4
    py-3
    focus:outline-none
    focus:ring-2
  "
/>

          </div>

          <div className="mb-6">

            <label
              className="
                block
                text-sm
                font-medium
                text-slate-700
                mb-2
              "
            >
              Password
            </label>

            <input
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  className="
    w-full
    border
    border-slate-300
    rounded-xl
    px-4
    py-3
    focus:outline-none
    focus:ring-2
  "
/>

          </div>
{
  error && (
    <div
      className="
        mb-4
        text-sm
        text-red-500
      "
    >
      {error}
    </div>
  )
}<button
  type="submit"
  disabled={loading}
  className="
    w-full
    py-3
    rounded-xl
    text-white
    font-semibold
    transition
    hover:opacity-90
    disabled:opacity-60
  "
  style={{
    backgroundColor: "#71A5DE",
  }}
>
  {
    loading
      ? "Signing In..."
      : "Sign In"
  }
</button>

        </form>

      </div>

    </div>
  );
}

export default Login;