import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      setError(err?.message || "Login failed");
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Login</h1>
        <p className="mt-1 text-sm text-slate-600">Sign in to continue.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="input input-bordered w-full border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              className="input input-bordered w-full border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="rounded-lg border border-pink-200 bg-pink-50 px-3 py-2 text-sm text-pink-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn w-full border-0 bg-sky-600 text-white hover:bg-sky-700"
            disabled={isLoading}
          >
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Forgot password? <Link to="/reset-password" className="font-semibold text-sky-700">Reset here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
