import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';


const Register = () => {
    // const authInfo = use(AuthContext);
    // console.log('register', authInfo);
    const { createUser, setUser, updateUser } = use(AuthContext);
    const navigate = useNavigate();
    // console.log('register', createUser);
    const [show, setShow] = useState(false);
    const [nameError, setNameError] = useState("")



    const handleRegister = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        if(name.length < 5){
            setNameError("Name Should Be More Than 5 Characters");
             toast.error("Name should be at least 5 characters long");
            return;
        }
        else{
            setNameError("");
        }
        const photo = event.target.photo.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (!regExp.test(password)) {
      toast.error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).");
      return;
    }

        // console.log({name, photo, email, password});
        createUser(email, password)
            .then((result) => {
                // console.log(result.user);
                const user = result.user;

                updateUser({
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => {
                        console.log("Profile updated");
                        // console.log(result);
                        toast.success("Registration successful!");
                        setUser({
                            ...user, displayName: name,
                            photoURL: photo
                        });
                        navigate("/");
                    })
                    .catch((error) => {
                        console.log(error)
                        setUser(user);
                    })

            })
            .catch(error => {
                console.log(error);
                if (error.code === "auth/invalid-email") {
          toast.error("Invalid email format!");
        }
        else if (error.code === "auth/user-not-found") {
          toast.error("No user found with this email!");
        }
        
        else if (error.code === "auth/too-many-requests") {
          toast.error("Too many failed attempts! Try again later.");
        }
        else if (error.code === "auth/user-disabled") {
          toast.error("This account has been disabled by admin.");
        }
        else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your internet connection.");
        }
       
        else {
          toast.error("Something went wrong: " + error.message);
        }
            })

    }


    return (

        <div className="hero bg-base-200 min-h-screen">

            <div className="hero-content flex-col lg:flex-row w-full px-4">

                {/* left */}
                <div className="text-center lg:text-left lg:w-1/2 mb-6 lg:mb-0">
                    <h1 className="text-5xl font-bold">Register now !!</h1>
                </div>

                {/* right */}
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl lg:w-1/2">
                    <h1 className="text-center text-2xl font-bold mt-2">Register now !!</h1>
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                {/* Name */}
                                <label className="label">Name</label>
                                <input type="text" name="name" className="input" placeholder="Your Name" required />

                                {nameError && <p className='text-red-600'>{nameError}</p>}
                                {/* Photo  */}
                                <label className="label">Photo</label>
                                <input type="text" name="photo" className="input" placeholder="Your Photo" />

                                {/* Email */}
                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Your Email" required />

                                {/* Password */}
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1">
                                        Password
                                    </label>
                                    <input
                                        // type="password"
                                        type={show ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        className="input input-bordered w-full bg-white text-black placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400" required
                                    />
                                    <span onClick={() => setShow(!show)} className="absolute right-[8px] top-[36px] cursor-pointer z-50 text-[black]">{show ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                                <button type="submit" className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                        </form>
                        <p className='text-center font-semibold'>Already have an Account ? Please <Link to='/login' className='text-green-600 font-bold underline'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;