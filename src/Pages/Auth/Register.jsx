import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const Register = () => {
    // const authInfo = use(AuthContext);
    // console.log('register', authInfo);
    const {createUser} = use(AuthContext);
    console.log('register', createUser);

    const handleRegister = (event)=>{
        event.preventDefault();
        // const name = event.target.email.value;
        // const photo = event.target.photo.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        // console.log({name, photo, email, password});
        createUser(email,password)
        .then((result)=>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error)
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
                                <input type="text" name="name" className="input" placeholder="Your Name" />

                                {/* Photo  */}
                                <label className="label">Photo</label>
                                <input type="photo" name="photo" className="input" placeholder="Your Photo" />

                                {/* Email */}
                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Your Email" />

                                {/* Password */}
                                <label className="label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Your Password" />

                                <div><a className="link link-hover">Forgot password?</a></div>

                                <button className="btn btn-neutral mt-4">Register</button>
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