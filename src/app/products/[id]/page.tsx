'use client';
import React, { useState, useEffect } from 'react';
import { getProductById } from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Header from '@/components/header/page';
import FooterPage from '@/components/footer/page';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import imgStar from '../../../../public/star.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

const ProductById = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id as string),
  });
  const product = data?.data;
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Update selectedImage when product data is available
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
    console.log(product);
  }, [product]);

  // Handle thumbnail click
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  if (isLoading) {
    return <Spinner className='size-15 mx-auto h-screen ' />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Header />
      <section className='flex flex-col gap-6 py-6 px-4 lg:gap-12 lg:p-0 lg:pt-9 lg:pl-[120px]'>
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/products'>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <BreadcrumbPage>Detail</BreadcrumbPage>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <p>{product.title}</p>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className='w-[361px] lg:w-[1200px] flex flex-col lg:flex-row gap-4 lg:gap-7'>
          {/* Image Detail */}
          <div className='flex flex-col w-[361px] gap-2 lg:gap-4 lg:w-[402px]'>
            <img
              src={selectedImage ? selectedImage : product.images[0]}
              className='size-[361px] rounded-xl lg:size-[402px] object-cover'
              alt={product.title}
            />
            <div className='flex flex-row gap-2 overflow-x-scroll'>
              {product.images && product.images.length > 0 ? (
                product.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    className={`image-detail size-[82px] cursor-pointer flex-shrink-0 ${
                      selectedImage === image
                        ? 'border-[2px] border-[#0A0D12]'
                        : 'border-none'
                    }`}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => handleImageClick(image)}
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
          {/* Product Detail */}
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-0.5 lg:gap-2'>
              <h3 className='font-semibold text-[16px] leading-[30px] tracking-tighter lg:text-xl lg:leading-[34px] lg:tracking-normal'>
                {product.title}
              </h3>
              <h2 className='sub-judul text-xl'>
                {`Rp${product.price.toLocaleString('id-ID')}`}
              </h2>
              <div className='flex flex-row gap-0.5 items-center'>
                <Image
                  src={imgStar}
                  alt='Rating'
                  className='size-5 lg:size-6'
                />
                <span className='font-semibold text-sm lg:text-lg tracking-tighter'>
                  {product.rating}
                </span>
              </div>
            </div>
            <hr className='border-[1px] border-[#D5D7DA] lg:w-[770px]' />
            {/* Description */}
            <div className='flex flex-col gap-4 lg:w-[770px]'>
              <div className='flex gap-0 items-center font-bold'>Deskripsi</div>
              <div className='product-desc w-fit flex flex-col !leading-7'>
                {product.description}
              </div>
            </div>
            <hr className='border-[1px] border-[#D5D7DA] lg:w-[770px]' />

            {/* Toko */}
            <div className='flex flex-row justify-between'>
              <div className='flex gap-2 lg:gap-4 w-full'>
                <img
                  src={product.shop.logo}
                  alt={product.shop.name}
                  className='size-12 lg:size-[64px] rounded-sm'
                />
                <div className='flex flex-col w-full my-auto'>
                  <p className='font-bold '>{product.shop.name}</p>
                  <p>{product.shop.address}</p>
                </div>
                <Button className='w-[120px] h-11 rounded-[8px] border border-[#D5D7DA] p-2 font-semibold text-sm leading-[30px] bg-transparent tracking-tighter hover:bg-gray-200 text-black cursor-pointer my-auto'>
                  See Store
                </Button>
              </div>
            </div>
            <hr className='border-[1px] border-[#D5D7DA] lg:w-[770px]' />

            {/* Quantity */}
            <div className='flex gap-4'>
              <span className='font-semibold text-sm lg:text-[16px] tracking-tighter leading-7 lg:leading-8'>
                Quantity
              </span>
              <div className='flex gap-2 py-2 px-3 rounded-xl border border-[#D5D7DA] w-[120px] h-11 items-center justify-between'>
                <button>
                  <Minus />
                </button>
                <span className='font-bold tracking-tighter text-lg leading-8'>
                  2
                </span>
                <button>
                  <Plus />
                </button>
              </div>
            </div>
            {/* Button Add to Cart */}
            <Button className='w-full p-2 lg:w-[312px] h-[48px] rounded-lg bg-[#0A0D12] text-[#FFFFFF] font-semibold tracking-tighter text-[16px] flex gap-1.5 justify-center items-center'>
              <Plus /> Add to Cart
            </Button>
          </div>
        </section>
        <hr className='border-[1px] border-[#D5D7DA] lg:w-[1200px]' />
      </section>
      <FooterPage />
    </>
  );
};

export default ProductById;
