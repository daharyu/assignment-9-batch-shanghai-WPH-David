/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

import imgVerif from '../../../public/Veirfy.svg';
import imgRating from '../../../public/star.svg';
import Image from 'next/image';
import Link from 'next/link';

type productData = {
  id: number | string;
  title: string;
  price: number;
  slug: string;
  images: Array<string>;
  rating: number;
  soldCount: number;
  shop: {
    name: string;
  };
};

const ProductCard = (product: any) => {
  const prod: productData = product?.product;

  function formatRupiah(number: number) {
    return 'Rp' + number.toLocaleString('id-ID');
  }

  const formattedPrice = formatRupiah(prod.price);
  return (
    <>
      <Link href={`/products/${prod.id}`}>
        <Card className='product-card p-0'>
          <CardContent className='p-0'>
            <CardDescription>
              <img
                src={prod.images[0]}
                className='product-image mx-auto'
                alt=''
              />
              <div className='p-3 flex flex-col gap-0.5'>
                <CardTitle className='product-desc font-normal'>
                  {prod.title}
                </CardTitle>
                <p className='product-price'>{formattedPrice}</p>
                <div className='flex flex-row gap-0.5'>
                  <Image src={imgRating} className='size-5 lg:size-6' alt='' />
                  <p className='product-desc'>{prod.rating}</p>
                  <p className='product-desc ml-1'>· {prod.soldCount} Sold</p>
                </div>
                <div className='flex items-center text-sm lg:text-[16px] tracking-tight leading-7'>
                  <Image src={imgVerif} className='size-5 lg:size-6' alt='' />
                  {prod.shop.name}
                </div>
              </div>
            </CardDescription>
          </CardContent>
          <CardFooter className='flex-col gap-2'></CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default ProductCard;
