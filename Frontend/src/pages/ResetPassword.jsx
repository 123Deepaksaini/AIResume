import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const initialEmail = searchParams.get("email") || "";
  const initialCode = searchParams.get("code") || "";

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState(initialCode);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!code.trim()) {
      setError("Reset code is required.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email, code, newPassword);
      toast.success("Password reset successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Failed to reset password");
      toast.error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
        <p className="mt-1 text-sm text-slate-600">
          Enter your email, reset code, and new password.
        </p>

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
            <label className="mb-1 block text-sm font-medium text-slate-700">Reset Code</label>
            <input
              type="text"
              className="input input-bordered w-full border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
            <input
              type="password"
              className="input input-bordered w-full border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Confirm Password</label>
            <input
              type="password"
              className="input input-bordered w-full border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Reset Password"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Back to <Link to="/login" className="font-semibold text-sky-700">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
