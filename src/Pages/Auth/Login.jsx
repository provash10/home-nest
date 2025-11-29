import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';


const Login = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");

    const { signInUser, signInWithGoogle } = use(AuthContext);
    console.log(signInUser);

    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();

    const handleLogIn = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(email, password); //checked

        // validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            // setError("Please enter a valid email address");
            toast.error("Invalid email format !!!");
            return;
        }

        
        if (password.length === 0) {
            // setError("Password cannot be empty");
            toast.error("Password required !!")
            return;
        }

        signInUser(email, password)
            .then((result) => {
                console.log(result.user)
                event.target.reset();
                toast.success("Login successful!");
                // navigate(location.state || '/')
                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch(error => {
                console.log(error);
                const errorCode = error.code;
                setError(errorCode);
                // alert
                  toast.error("Login failed: " + error.message);
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user)
                // event.target.reset();
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error);
                  toast.error("Google sign-in failed: " + error.message);
            })

    }

    return (
        <div className="hero bg-base-200 min-h-screen">

            <div className="hero-content flex-col lg:flex-row w-full px-4">

                {/* left */}
                <div className="text-center lg:text-left lg:w-1/2 mb-6 lg:mb-0">
                    <h1 className="text-5xl font-bold">Login now !!</h1>
                </div>

                {/* right */}
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl lg:w-1/2">
                    <h1 className="text-center text-2xl font-bold mt-2">Login now !!</h1>
                    <div className="card-body">
                        <form onSubmit={handleLogIn}>
                            <fieldset className="fieldset">
                                {/* email */}
                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" required />

                                {/* Password */}
                                <div className="relative">
                                    <label className="block text-sm mb-1">Password</label>
                                    <input
                                        // type="password"
                                        type={show ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        className="input input-bordered w-full bg-white/20 text-black placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required />
                                    <span onClick={() => setShow(!show)} className="absolute right-[8px] top-[36px] cursor-pointer z-50 text-[black]">{show ? <FaEye /> : <FaEyeSlash />}</span>
                                    {/* forget password */}
                                    <button type="button" className=" flex justify-start font-bold hover:underline hover:text-black cursor-pointer">
                                        Forget Password ?</button>
                                </div>

                                {error && <p className='text-red-600'>{error}</p>}


                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>
                        {/* sign in with google */}
                        <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                        <p className='text-center font-semibold'>Don't have an Account ? Please <Link to='/register' className='text-green-600 font-bold underline'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;