import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const Login = () => {
    const {signInUser} = use(AuthContext);
    console.log(signInUser);

    const handleLogIn = (event) =>{
        event.preventDefault();
         const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(email, password); //checked
        
        signInUser(email,password)
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
                    <h1 className="text-5xl font-bold">Login now !!</h1>
                </div>

                {/* right */}
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl lg:w-1/2">
                <h1 className="text-center text-2xl font-bold mt-2">Login now !!</h1>
                    <div className="card-body">
                        <form onSubmit={handleLogIn}>
                            <fieldset className="fieldset">
                                {/* Email */}
                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" />

                                {/* Password */}
                                <label className="label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Password" />

                                <div><a className="link link-hover">Forgot password?</a></div>

                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>
                        <p className='text-center font-semibold'>Don't have an Account ? Please <Link to='/register' className='text-green-600 font-bold underline'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;