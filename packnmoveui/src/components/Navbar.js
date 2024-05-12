import {React, useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { getUser, setUser, logout } from '../states/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromToken } from '../auth/auth';
import CartIcon from './CartIcon';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(0)
    const [isDelayPassed, setIsDelayPassed] = useState(false);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrolled(position);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setIsDelayPassed(true);
        }, 100);
        return () => clearTimeout(delayTimer);
    }, [scrolled])

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        return navigate('/login');
    }

    useEffect(() => {
        getUserFromToken().then(response => {
            if(response) dispatch(setUser(response.data))
        }).catch(error => {
            console.log(error);
        });
    }, [dispatch, navigate])


  return (
    <div className={`sticky z-50 flex h-16 ${scrolled && isDelayPassed > 0? 'bg-white shadow-md transition-background-color duration-500 ease-in-out': 'bg-ccdaaf'} items-center p-2 top-0`}>
        <div className='min-w-fit flex flex-grow items-center'>
            <div className='flex flex-grow w-1/3'>
                <Link href="/">
                    <img
                    src={"/favicon.ico"}
                    className='mr-2'
                    alt="Logo"
                    style={{height:50, width:50}}
                    />
                </Link>
                
                <div className='items-center font-bold'>
                    <div className="text-4xl font-titillium-web font-bold pl-2 py-2"><Link to="/">Pack-N-Move<span className="text-sm">.com</span></Link></div>
                </div>
            </div>
            <div className='flex flex-grow justify-center p-2 my-2 w-1/3'>
                    <div className='font-titillium-web items-center'>
                        <a href='/'>For Enterprises</a> <a href='/'><span className='pl-2'>Delivery Partners</span></a>
                    </div>
            </div>
            <div className='flex flex-grow justify-end w-1/3'>
                <div className='font-titillium-web justify-end pr-2 mr-2'>
                    {user != null ?
                    (                        
                        <div className='flex'>
                            <Link to="/checkout"><CartIcon /></Link>
                            <button onClick={handleLogout} className='ml-2'>Logout</button>
                        </div>
                    )
                    : (<><Link to='/login'>Login</Link> <Link to="/register"><span className='px-2'>Register</span></Link></>)}
                </div>
            </div>
        </div>
    </div>
  )
}


export default Navbar