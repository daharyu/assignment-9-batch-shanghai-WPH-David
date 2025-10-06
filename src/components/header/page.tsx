'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import imgLogo from '../../../public/Logo.svg';
import imgSearch from '../../../public/Search.svg';
import imgGrid from '../../../public/Grid.svg';
import imgCart from '../../../public/shopping-cart-01.svg';
import imgMenu from '../../../public/Menu.svg';
import imgStore from '../../../public/Store.svg';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { getShop } from '@/services/shop.service';

type Profile = {
  avatarUrl: string;
  name: string;
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    let user = null;

    // Parse userString safely
    if (userString) {
      user = JSON.parse(userString);
    }

    if (token) {
      setIsLoggedIn(true);
      // Set profile only if user exists and has a valid avatarUrl
      if (user) {
        setProfile(user);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <nav className='nav'>
        {/* <!-- Logo --> */}
        <Link href='/' className='lg:w-1/4 w-1/9 '>
          <div className='logo'>
            <Image src={imgLogo} alt='' className='size-8 lg:size-[42px]' />
            <h3 className='font-sfpro-bold text-2xl hidden lg:block'>Shirt</h3>
          </div>
        </Link>
        {/* <!-- Category --> */}
        <div className='lg:w-[632px] relative flex flex-row gap-1.5 lg:gap-3'>
          <a href='./catalog.html'>
            <Button className='flex flex-row border-[1px] border-[#D5D7DA] px-2.5 lg:px-4 w-10 h-10 lg:gap-1.5 rounded-xl items-center lg:w-fit lg:h-11 bg-transparent hover:bg-gray-200 text-black'>
              <Image src={imgGrid} className='size-[15px] lg:size-5' alt='' />
              <h3 className='text-sm hidden lg:block'>Catalog</h3>
            </Button>
          </a>
          <input
            type='text'
            placeholder='Search'
            className='w-[190px] h-10 lg:w-[491px] lg:h-11 lg:py-2 lg:px-4 border-[1px] border-[#D5D7DA] rounded-xl indent-8 lg:indent-6'
          />
          <Image
            src={imgSearch}
            className='size-[20px] absolute left-14 lg:left-35 top-2.5 lg:top-3'
            alt=''
          />
        </div>
        {/* <!-- profile | cart --> */}
        <div className=' flex flex-row gap-[13px] lg:justify-center lg:w-[100px] items-center'>
          <Button className='relative bg-transparent hover:bg-gray-200'>
            <Link href='./cart.html'>
              <Image src={imgCart} className='size-6' alt='' />
              <p className='absolute size-5 bg-[#EE1D52] font-inter text-[#ffffff] font-semibold rounded-full flex items-center justify-center top-0 lg:top-0 text-xs right-1'>
                6
              </p>
            </Link>
          </Button>
        </div>
        {isLoggedIn ? (
          <div className='hidden lg:flex flex-row-reverse rounded-xl w-[450px] h-11 gap-3'>
            {/* Profile */}
            <Button className='h-[44px] border border-[#D5D7DA] rounded-full flex flex-row gap-2 w-fit justify-center bg-white text-black hover:bg-gray-200 cursor-pointer'>
              <img
                src={profile?.avatarUrl}
                className='size-6 rounded-full'
                width={20}
                height={20}
                alt='User avatar'
              />
              <h4 className='text-sm leading-6 w-fit font-bold'>
                {profile?.name}
              </h4>
            </Button>

            {/* Store */}
            <Link href={`/open-store`}>
              <Button className='h-[44px] border border-[#D5D7DA] rounded-full flex flex-row gap-2 w-fit justify-center bg-white text-black hover:bg-gray-200 cursor-pointer'>
                <Image src={imgStore} className='size-5' alt='' />
                <p className='text-sm leading-6 w-fit font-bold'>Open Store</p>
              </Button>
            </Link>
          </div>
        ) : (
          <div className='hidden lg:flex flex-row  rounded-xl w-fit h-11 gap-3 items-center'>
            <Link href='/login' className='w-[144px] '>
              <Button className='w-full cursor-pointer rounded-xs border border-[#D5D7DA] text-black bg-white hover:bg-[#D5D7DA]'>
                Login
              </Button>
            </Link>
            <Link href='/register' className='w-[144px]'>
              <Button className='w-full cursor-pointer rounded-xs border border-[#D5D7DA]'>
                Register
              </Button>
            </Link>
          </div>
        )}
        <div className='block lg:hidden'>
          <Button className='bg-transparent hover:bg-gray-200 p-0'>
            <Image src={imgMenu} className='size-6' alt='' />
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Header;
