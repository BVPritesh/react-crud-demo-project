import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { SignInForm, SignInErrors } from "../types/types";

const SignIn = (): React.ReactElement => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<SignInForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<SignInErrors>({});
  const [apiError, setApiError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = (): SignInErrors => {
    const newErrors: SignInErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  // reset sign in form
  const resetForm = (): void => {
    setFormData({ email: "", password: "" });
    setErrors({});
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setApiError("");

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as any).error || "Login failed");
      }

      const token = String((data as any).id ?? "");
      login(token);
      alert("Login successful!");
      navigate("/dashboard", { replace: true });

      setTimeout(() => {
        if (window.location.pathname !== "/dashboard") {
          window.location.href = "/dashboard";
        }
      }, 100);
    } catch (error: any) {
      setApiError(error?.message ?? "An error occurred");
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-16 px-5">
      <div className="flex justify-center items-center gap-3 flex-col border border-gray-300 rounded-xl w-full max-w-[450px] px-8 py-8 bg-white">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Sign In</h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-4 w-full">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {apiError && <p className="text-red-600 text-sm">{apiError}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-700"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;