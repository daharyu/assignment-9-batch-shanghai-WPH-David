//  eslint-disable @next/next/no-img-element
'use client';
import React, { useState, useEffect } from 'react';
import { getProductById, postCart } from '@/services/product.service';
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

type reviewData = {
  id: number | string;
  comment: string;
  star: number;
  user: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
};

const ProductById = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id as string),
  });
  const [qty, setQty] = useState(1);
  const product = data?.data;
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Default placeholder image
  const DEFAULT_IMAGE = '/default-placeholder.png';

  // Function to validate image URL
  const isValidImageUrl = (url: string): boolean => {
    return typeof url === 'string' && url !== 'string' && url.trim() !== '';
  };

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    let formatted = date.toLocaleString('en-GB', options);
    formatted = formatted
      .replace(/,/, '')
      .replace(/(\d+)\s(\w+)\s(\d+)\sat\s(\d+):(\d+)/, '$1 $2 $3, $4:$5');
    return formatted;
  }

  // Update selectedImage when product data is available
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      const firstValidImage = product.images.find(isValidImageUrl);
      setSelectedImage(firstValidImage || DEFAULT_IMAGE);
    } else {
      setSelectedImage(DEFAULT_IMAGE);
    }
  }, [product]);

  // Handle thumbnail click
  const handleImageClick = (image: string) => {
    setSelectedImage(isValidImageUrl(image) ? image : DEFAULT_IMAGE);
  };

  if (isLoading) {
    return <Spinner className='size-15 mx-auto h-screen' />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddCart = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = {
          productId: product.id,
          qty: qty,
          token: token,
        };
        await postCart(payload);
        alert('Added to cart successfully!');
      } catch (error) {
        console.error('Failed to add to cart:', error);
        alert('Failed to add to cart. Please try again.');
      }
    } else {
      alert('Please log in to add items to cart.');
    }
  };

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
              src={
                isValidImageUrl(selectedImage) ? selectedImage : DEFAULT_IMAGE
              }
              className='size-[361px] rounded-xl lg:size-[402px] object-cover'
              alt={product.title || 'Product image'}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_IMAGE;
              }}
            />
            <div className='flex flex-row gap-2 overflow-x-scroll'>
              {product.images && product.images.length > 0 ? (
                product.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={isValidImageUrl(image) ? image : DEFAULT_IMAGE}
                    className={`image-detail size-[82px] cursor-pointer flex-shrink-0 ${
                      selectedImage === image
                        ? 'border-[2px] border-[#0A0D12]'
                        : 'border-none'
                    }`}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => handleImageClick(image)}
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_IMAGE;
                    }}
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
                  {product.rating.toFixed(1)}
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
                  src={
                    isValidImageUrl(product.shop.logo)
                      ? product.shop.logo
                      : DEFAULT_IMAGE
                  }
                  alt={product.shop.name || 'Shop logo'}
                  className='size-12 lg:size-[64px] rounded-sm'
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_IMAGE;
                  }}
                />
                <div className='flex flex-col w-full my-auto'>
                  <p className='font-bold'>{product.shop.name}</p>
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
                <button
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  aria-label='Decrease quantity'
                >
                  <Minus />
                </button>
                <span className='font-bold tracking-tighter text-lg leading-8'>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  aria-label='Increase quantity'
                >
                  <Plus />
                </button>
              </div>
            </div>
            {/* Button Add to Cart */}
            <Button
              className='w-full p-2 lg:w-[312px] h-[48px] rounded-lg bg-[#0A0D12] text-[#FFFFFF] font-semibold tracking-tighter text-[16px] flex gap-1.5 justify-center items-center'
              onClick={handleAddCart}
            >
              <Plus /> Add to Cart
            </Button>
          </div>
        </section>
        <hr className='border-[1px] border-[#D5D7DA] lg:w-[1200px]' />
      </section>

      <section className='w-[361px] lg:w-[1200px] flex flex-col gap-4 lg:gap-7 mx-auto mt-10'>
        <h1 className='sub-judul w-full'>Product Reviews</h1>
        <div className='flex gap-1 items-center'>
          <Image src={imgStar} alt='Rating' className='size-6 lg:size-10' />
          <p className='font-semibold text-sm lg:text-lg tracking-tighter'>
            {product.rating.toFixed(1)}
            <span className='text-[#414651]'>/ 5.0</span>
          </p>
        </div>
        {product.reviews.map((review: reviewData) => (
          <div className='flex flex-col gap-2' key={review.id}>
            <div className='flex flex-row gap-4 items-center'>
              <img
                src={
                  isValidImageUrl(review.user.avatarUrl)
                    ? review.user.avatarUrl
                    : DEFAULT_IMAGE
                }
                alt={review.user.name || 'User avatar'}
                className='size-14 lg:size-16 rounded-full'
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_IMAGE;
                }}
              />
              <div className='flex flex-col gap-3'>
                <p className='font-bold text-sm lg:text-lg tracking-tighter'>
                  {review.user.name}
                </p>
                <p className='text-[#0A0D12]'>{formatDate(review.createdAt)}</p>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-0.5'>
                {Array.from({ length: review.star }).map((_, index) => (
                  <Image
                    key={index}
                    src={imgStar}
                    width={24}
                    height={24}
                    alt='Rating'
                    className='size-6'
                  />
                ))}
              </div>
              <p className='text-sm lg:text-[16px] text-[#0A0D12] tracking-tighter'>
                {review.comment}
              </p>
            </div>
            <hr className='border-[1px] border-[#D5D7DA] lg:w-[1200px] mt-5' />
          </div>
        ))}
      </section>
      <FooterPage />
    </>
  );
};

export default ProductById;
