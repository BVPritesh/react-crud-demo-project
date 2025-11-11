import { useState } from "react";

export default function SignIn() {
  // Form data as plain object
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Error and state management
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  // Input change handler
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // Validation
  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

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

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      console.log("formData:", formData);

      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      alert("Login successful! Token: " + data.id);
      localStorage.setItem("token", data.id);
    } catch (error: any) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-16 px-5">
      <div className="flex justify-center items-center gap-3 flex-col border border-gray-300 rounded-xl w-full max-w-[450px] px-8 py-8 bg-white">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Sign In</h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-4 w-full">
            {/* Email field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* API error */}
            {apiError && (
              <p className="text-red-600 text-sm">{apiError}</p>
            )}

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary bg-blue-600 text-white rounded py-2 px-4 w-full hover:bg-blue-700"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
