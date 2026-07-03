import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";
import { backendUrl } from "../App";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient.post(`/api/user/admin`, {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setToken(res.data.token);
        console.log(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
      console.log(error);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4">
      <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 shadow-2xl">
        <h1 className="text-center text-4xl font-bold text-gray-900">
          Admin Panel
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Sign in to continue to your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition-all duration-200 focus-within:border-shop_light_green focus-within:bg-white focus-within:ring-2 focus-within:ring-shop_light_green/20">
              <Mail className="h-5 w-5 text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-3 py-4 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition-all duration-200 focus-within:border-shop_light_green focus-within:bg-white focus-within:ring-2 focus-within:ring-shop_light_green/20">
              <Lock className="h-5 w-5 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent px-3 py-4 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-400 transition hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-shop_light_green py-4 text-lg font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;