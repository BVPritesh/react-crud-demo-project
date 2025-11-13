import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState<any>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect away if already signed in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  function handleChange(e: { target: { name: string; value: string; }; }) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

    // Basic validation function
  const validate = () => {
    const newErrors: any = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if(!/^[A-Za-z]+$/.test(formData.name)) {
      newErrors.name = "Please enter character only";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(formData.username)) {
      newErrors.username = "Please enter character, number and specical character only";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

    // Submit handler
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setApiError("");

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("data : ", data);

      if (!response.ok) {
        throw new Error(data.error || "Sign up failed");
      }

      // store token and redirect to dashboard
      const token = String(data.id ?? "");
      login(token);
      alert("Sign up successful!");
      // SPA navigation (preferred)
      navigate("/dashboard", { replace: true });
      // Fallback: if the SPA router doesn't update the UI immediately,
      // force a full navigation so the dashboard reads localStorage.
      setTimeout(() => {
        if (window.location.pathname !== "/dashboard") {
          window.location.href = "/dashboard";
        }
      }, 100);

      console.log("Sign up Response:", data);
      // You can store token in localStorage

    } catch (error: any) {
      setApiError(error?.message ?? "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-16 px-5">
      <div className="flex justify-center items-center gap-3 flex-col border border-gray-300 rounded-xl w-full max-w-[450px] px-8 py-8 bg-white">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Sign Up
        </h1>
        <form
          className="w-full"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4 w-full">
            <div>
              <input 
                type="text" 
                name="name" 
                placeholder="Enter name" 
                className="form-control" 
                value={formData.name}
                onChange={handleChange}
              />
              {
                errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )
              }
            </div> 
            <div>
              <input 
                type="text" 
                name="username" 
                placeholder="Enter user name" 
                className="form-control" 
                value={formData.username}
                onChange={handleChange}
              />
              {
                errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )
              }
            </div> 
            <div>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter email" 
                className="form-control" 
                value={formData.email}
                onChange={handleChange}
              />
              {
                errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )
              }
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
              {
                errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )
              }
            </div>           
            {/* API Error */}
            {apiError && (
              <p className="text-red-600 text-sm">{apiError}</p>
            )}
            <div>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}