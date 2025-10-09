/* eslint-disable @next/next/no-img-element */
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
import { DropdownMenuDemo } from '../dropDown/page';

interface Profile {
  avatarUrl: string;
  name: string;
}

interface CartItem {
  id: number;
  // Add other relevant item properties
}

interface Cart {
  cartId: number;
  grandTotal: number;
  items: CartItem[];
}

interface Shop {
  name: string;
  // Add other shop properties
}

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [haveShop, setHaveShop] = useState<Shop | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShop = async (token: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/seller/shop`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch shop data');
      }

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('shop', JSON.stringify(data.data));
        setHaveShop(data.data);
      }
    } catch (err) {
      console.error('Error fetching shop:', err);
      setError('Failed to load shop data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCart = async (token: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch cart data');
      }

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('cart', JSON.stringify(data.data));
        setCart(data.data);
        console.log(data.data);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        setIsLoggedIn(true);
        setProfile(user);
        fetchShop(token);
        fetchCart(token);
      } catch (err) {
        console.error('Error parsing user data:', err);
        setError('Failed to load user data');
      }
    }
  }, []);

  return (
    <nav className='nav'>
      <Link href='/' className='lg:w-1/4 w-1/9'>
        <div className='logo'>
          <Image
            src={imgLogo}
            alt='Company Logo'
            className='size-8 lg:size-[42px]'
          />
          <h3 className='font-sfpro-bold text-2xl hidden lg:block'>Shirt</h3>
        </div>
      </Link>

      <div className='lg:w-[632px] relative flex flex-row gap-1.5 lg:gap-3'>
        <Link href='/catalog'>
          <Button className='flex flex-row border-[1px] border-[#D5D7DA] px-2.5 lg:px-4 w-10 h-10 lg:gap-1.5 rounded-xl items-center lg:w-fit lg:h-11 bg-transparent hover:bg-gray-200 text-black'>
            <Image
              src={imgGrid}
              className='size-[15px] lg:size-5'
              alt='Catalog Icon'
            />
            <h3 className='text-sm hidden lg:block'>Catalog</h3>
          </Button>
        </Link>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search'
            className='w-[190px] h-10 lg:w-[491px] lg:h-11 lg:py-2 lg:px-4 border-[1px] border-[#D5D7DA] rounded-xl indent-8 lg:indent-6'
          />
          <Image
            src={imgSearch}
            className='size-[20px] absolute left-2 lg:left-3 top-2.5 lg:top-3'
            alt='Search Icon'
          />
        </div>
      </div>

      <div className='flex flex-row gap-[13px] lg:justify-center lg:w-[100px] items-center'>
        <Button className='relative bg-transparent hover:bg-gray-200'>
          <Link href='/cart'>
            <Image src={imgCart} className='size-6' alt='Cart Icon' />
            {cart && cart.items.length > 0 && (
              <p className='absolute size-5 bg-[#EE1D52] font-inter text-[#ffffff] font-semibold rounded-full flex items-center justify-center top-0 lg:top-0 text-xs right-1'>
                {cart.items.length}
              </p>
            )}
          </Link>
        </Button>
      </div>

      {isLoggedIn && profile ? (
        <div className='hidden lg:flex flex-row-reverse rounded-xl w-[450px] h-11 gap-3'>
          <Button className='h-[44px] border border-[#D5D7DA] rounded-full flex flex-row gap-2 w-fit justify-center bg-white text-black hover:bg-gray-200 cursor-pointer'>
            <img
              src={profile.avatarUrl || '/default-avatar.png'}
              className='size-6 rounded-full'
              width={20}
              height={20}
              alt={`${profile.name}'s avatar`}
            />
            <h4 className='text-sm leading-6 w-fit font-bold'>
              {profile.name}
            </h4>
          </Button>
          <Link href={haveShop ? '/dashboard' : '/open-store'}>
            <Button className='h-[44px] border border-[#D5D7DA] rounded-full flex flex-row gap-2 w-fit justify-center bg-white text-black hover:bg-gray-200 cursor-pointer'>
              <Image src={imgStore} className='size-5' alt='Store Icon' />
              <p className='text-sm leading-6 w-fit font-bold'>
                {haveShop?.name || 'Open Store'}
              </p>
            </Button>
          </Link>
        </div>
      ) : (
        <div className='hidden lg:flex flex-row rounded-xl w-fit h-11 gap-3 items-center'>
          <Link href='/login' className='w-[144px]'>
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
          <Image src={imgMenu} className='size-6' alt='Menu Icon' />
        </Button>
      </div>

      {error && <div className='text-red-500 text-sm mt-2'>{error}</div>}
    </nav>
  );
};

export default Header;
