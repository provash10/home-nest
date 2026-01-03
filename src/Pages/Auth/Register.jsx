import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (name.length < 5) {
      toast.error("Name must be at least 5 characters");
      return;
    }

    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!regExp.test(password)) {
      toast.error("Password does not meet requirements");
      return;
    }

    try {
      setLoading(true);

      // Firebase Register
      const result = await createUser(email, password, name, photo);
      const user = result.user;

      // Save user to MongoDB
      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: name,
          photoURL: photo,
        }),
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <form onSubmit={handleRegister}>
            <input name="name" placeholder="Name" className="input input-bordered w-full mb-3" required />
            <input name="photo" placeholder="Photo URL" className="input input-bordered w-full mb-3" />
            <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-3" required />

            <div className="relative mb-3">
              <input
                name="password"
                type={show ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full"
                required
              />
              <span onClick={() => setShow(!show)} className="absolute right-3 top-3 cursor-pointer">
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
