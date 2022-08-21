import React, {useEffect,useState} from "react";
import {LockClosedIcon} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../../../store/api/authAPI";

const LoginComponent = (props) => {
    const router = useRouter();
    const dispatch = useDispatch()

    const redirect = useSelector(state => state.authReducer.redirectTo)
    const error = useSelector(state => state.authReducer.error)
    const [submit,setsubmit] = useState(false)
    let email = React.createRef();
    let password = React.createRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email.current.value)
        // console.log(password.current.value)
        await dispatch(register(email.current.value, password.current.value))
        if (error) {
            alert(error)
        } else {
            setsubmit(true)
        }
    }

    useEffect(() => {
        // if(localStorage.user){
        //     navigate('/profile')
        // }
        if (redirect) {
            if (submit)
            router.push(redirect)
        }
    },[submit])

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="http://localhost:3000/logos/MIUU-20220730-LOGO-OK.svg"
                        alt="Wave"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{props.text}</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                ref={email}
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                ref={password}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            // onClick={handleSubmit}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComponent;