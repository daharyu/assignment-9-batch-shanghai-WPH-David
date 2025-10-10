//  eslint-disable @next/next/no-img-element
'use client';
import FooterPage from '@/components/footer/page';
import Header from '@/components/header/page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import imgTrash from '../../../public/Trash.svg';
import { deleteById } from '@/services/cart.service';
import Link from 'next/link';

type CartItem = {
  id: string | number;
  product: {
    title: string;
    images: string[];
  };
  qty: number;
  subtotal: number;
};

type CartGroup = {
  shop: {
    name: string;
    slug: string;
  };
  items: CartItem[];
};

type Cart = {
  groups: CartGroup[];
  grandTotal: number;
};

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);

  // Load cart from localStorage only on the client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      setCart(storedCart ? JSON.parse(storedCart) : null);
    }
  }, []);

  const handleClick = (grp: number, key: number) => {
    if (!cart || !cart.groups?.[grp]?.items[key]) return; // Guard for missing cart or item
    deleteCart(grp, key);
  };

  const deleteCart = async (grp: number, key: number) => {
    if (typeof window === 'undefined') return; // Ensure running in browser
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    if (!cart || !cart.groups?.[grp]?.items[key].id) {
      console.error('Invalid cart item');
      return;
    }

    const payload = {
      itemId: cart.groups[grp].items[key].id,
      token: token,
    };
    try {
      await deleteById(payload);
      console.log('Cart item deleted successfully');
      // Update localStorage and state after deletion
      const updatedGroups = [...cart.groups];
      updatedGroups[grp].items = updatedGroups[grp].items.filter(
        (_, i) => i !== key
      );
      const updatedCart = {
        ...cart,
        groups: updatedGroups.filter((group) => group.items.length > 0),
        grandTotal: updatedGroups.reduce(
          (total, group) =>
            total + group.items.reduce((sum, item) => sum + item.subtotal, 0),
          0
        ),
      };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  // Guard for empty or invalid cart
  if (!cart || !cart.groups || cart.groups.length === 0) {
    return (
      <>
        <Header />
        <section className='w-[393px] lg:w-[1200px] mx-auto mt-5 px-4 lg:px-0'>
          <h1 className='sub-judul mb-5'>Cart</h1>
          <div className='w-[345px] lg:w-[538px] lg:gap-8 mx-auto my-auto flex flex-col items-center'>
            <Image
              src='./EmptyBag.svg'
              alt='Empty Cart'
              width={200}
              height={200}
              className='size-[140px] lg:size-[200px] rounded-lg object-cover'
            />
            <div className='text-center'>
              <h2 className='text-[16px] lg:text-lg font-bold tracking-tighter'>
                Your Cart is Empty
              </h2>
              <p className='tracking-tighter text-sm lg:text-[16px] text-[#414651]'>
                Your cart is waiting. Add your favorite items and come back to
                checkout.
              </p>
            </div>
            <Link href='/products' className='flex items-center gap-2'>
              <Button className='w-[280px] lg:w-[305px] h-[48px] font-semibold text-[16px]'>
                Start Shopping
              </Button>
            </Link>
          </div>
        </section>
        <FooterPage />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className='w-[393px] lg:w-[1200px] mx-auto mt-5 px-4 lg:px-0'>
        <div className='flex flex-col lg:flex-row w-full justify-between'>
          {/* <!-- KIRI --> */}
          <div className='lg:col-span-8 w-full'>
            <h1 className='sub-judul mb-5'>Cart</h1>

            {/* <!-- Select All --> */}
            <div className='flex items-center gap-2 pb-4 mb-4 border-b border-[#E6E8EC]'>
              <input
                type='checkbox'
                className='size-4 rounded border-[#D5D7DA]'
              />
              <span className='text-sm'>Select All</span>
            </div>

            {/* Shop Card */}
            {cart.groups.map((group, i) => (
              <div
                className='flex flex-col rounded-xl border border-[#D5D7DA] px-4 mb-4 justify-between w-11/12'
                key={i}
              >
                <div className='flex items-center gap-4 py-4 border-b border-[#E6E8EC]'>
                  <Input
                    type='checkbox'
                    className='size-4 rounded border-[#D5D7DA] self-start'
                  />
                  <Image
                    src='./Store.svg'
                    alt=''
                    width={82}
                    height={82}
                    className='size-5 rounded-lg object-cover'
                  />
                  <p>{group.shop.name}</p>
                </div>
                {group.items.map((item, j) => (
                  <div
                    className='flex items-center gap-4 py-4 border-b border-[#E6E8EC] justify-between'
                    key={j}
                  >
                    <div className='flex gap-4'>
                      <Input
                        type='checkbox'
                        className='size-4 rounded border-[#D5D7DA] self-start'
                      />
                      <img
                        src={item.product.images[0]}
                        alt=''
                        className='size-[82px] rounded-lg object-cover'
                      />
                      <div className='flex-1'>
                        <p className='font-sfpro-bold leading-7'>
                          {item.product.title}
                        </p>
                        <p className='text-sm text-[#6C727F] leading-6'>
                          {group.shop.slug}
                        </p>
                      </div>
                    </div>

                    {/* <!-- Kanan: HARGA ATAS, TRASH+QTY BAWAH --> */}
                    <div className='flex flex-col items-end gap-2 min-w-[220px]'>
                      <div className='font-sfpro-bold'>
                        {`Rp${item.subtotal.toLocaleString('id-ID')}`}
                      </div>
                      <div className='flex items-center gap-4'>
                        <Button
                          className='w-16 rounded-lg border border-[#D5D7DA] flex items-center justify-center bg-transparent hover:bg-[#E6E8EC]'
                          aria-label='Remove'
                          onClick={() => handleClick(i, j)}
                        >
                          <Image src={imgTrash} alt='' width={24} height={24} />
                        </Button>
                        <div className='h-[48px] px-3 rounded-xl border border-[#D5D7DA] flex items-center gap-4'>
                          <button className='text-lg' aria-label='Decrease'>
                            −
                          </button>
                          <span className='font-sfpro-bold'>{item.qty}</span>
                          <button className='text-lg' aria-label='Increase'>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* <!-- KANAN: SUMMARY sejajar judul --> */}
          <aside className='lg:w-[352px]'>
            <div className='lg:w-[352px] rounded-2xl border border-[#E6E8EC] bg-white p-4 lg:sticky lg:top-6'>
              <p className='font-sfpro-semi-bold mb-4'>Total Shopping</p>
              <div className='flex items-center justify-between mb-6'>
                <span className='text-sm text-[#6C727F]'>Total</span>
                <span className='font-sfpro-bold'>{`Rp${cart.grandTotal.toLocaleString(
                  'id-ID'
                )}`}</span>
              </div>
              <Link href='/checkout'>
                <Button className='w-full h-[48px] rounded-xl bg-[#0A0D12] text-[#FFFFFF] font-sfpro-semi-bold'>
                  Checkout
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <FooterPage />
    </>
  );
};

export default CartPage;
