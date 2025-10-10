'use client';
import FooterPage from '@/components/footer/page';
import Header from '@/components/header/page';
import ProductCard from '@/components/productCard/page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { getProductInfinite } from '@/services/product.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

type ProductData = {
  id: number | string;
  title: string;
  price: number;
  slug: string;
  image: string;
  rating: number;
  soldCount: number;
};

type Pagination = {
  page: number;
  totalPages: number;
};

type ProductResponse = {
  success: boolean;
  message: string;

  data: {
    products: ProductData[];
    pagination: Pagination;
  };
};

interface InfiniteData<TData> {
  pages: TData[];
  pageParams: unknown[];
}

const CatalogPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      ProductResponse,
      Error,
      InfiniteData<ProductResponse>,
      ['products'],
      number
    >({
      queryKey: ['products'],
      queryFn: ({ pageParam = 1 }) => getProductInfinite(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (
          lastPage.data.pagination.page < lastPage.data.pagination.totalPages
        ) {
          return lastPage.data.pagination.page + 1;
        }
        return undefined;
      },
    });

  const products: ProductData[] =
    data?.pages?.flatMap((page) => page.data.products) ?? [];
  return (
    <>
      <Header />
      <section className='w-[393px] lg:w-[1200px] mx-auto mt-5'>
        <div className='px-4 lg:px-0'>
          <h1 className='sub-judul mb-2.5 lg:mb-7'>Catalog</h1>

          {/* <!-- 2 kolom di desktop, 1 kolom di mobile --> */}
          <div className='grid grid-cols-1 lg:grid-cols-12 lg:gap-6'>
            {/* <!-- SIDEBAR --> */}
            <aside className='lg:col-span-3'>
              <div className='rounded-2xl border border-[#E6E8EC] bg-white'>
                <div className='p-4 border-b border-[#E6E8EC]'>
                  <h3 className='font-sfpro-bold text-lg'>FILTER</h3>
                </div>

                {/* <!-- Categories --> */}
                <div className='p-4 border-b border-[#E6E8EC]'>
                  <p className='font-sfpro-semi-bold text-sm mb-3'>
                    Categories
                  </p>
                  <div className='flex flex-col gap-2'>
                    <label className='flex items-center gap-2'>
                      <Input
                        type='checkbox'
                        className='size-4 rounded border-[#D5D7DA]'
                      />
                      <span>All</span>
                    </label>
                    <label className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        className='size-4 rounded border-[#D5D7DA]'
                      />
                      <span>Shoes</span>
                    </label>
                    <label className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        className='size-4 rounded border-[#D5D7DA]'
                      />
                      <span>Clothes</span>
                    </label>
                    <label className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        className='size-4 rounded border-[#D5D7DA]'
                      />
                      <span>Accessories</span>
                    </label>
                  </div>
                </div>

                {/* <!-- Price --> */}
                <div className='p-4 border-b border-[#E6E8EC]'>
                  <p className='font-sfpro-semi-bold text-sm mb-3'>Price</p>
                  <div className='flex flex-col gap-3'>
                    <div className='relative'>
                      <span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6C727F]'>
                        Rp
                      </span>
                      <input
                        type='text'
                        placeholder='Minimum Price'
                        className='w-full h-10 pl-10 pr-3 rounded-lg border border-[#D5D7DA] outline-none'
                      />
                    </div>
                    <div className='relative'>
                      <span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6C727F]'>
                        Rp
                      </span>
                      <input
                        type='text'
                        placeholder='Maximum Price'
                        className='w-full h-10 pl-10 pr-3 rounded-lg border border-[#D5D7DA] outline-none'
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Rating --> */}
                <div className='p-4'>
                  <p className='font-sfpro-semi-bold text-sm mb-3'>Rating</p>
                  <div className='flex flex-col gap-2'>
                    <label className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        className='size-4 rounded border-[#D5D7DA]'
                      />
                      <span className='flex items-center gap-1'>
                        <Image
                          src='./star.svg'
                          width={20}
                          height={20}
                          className='size-4'
                          alt=''
                        />
                        5
                      </span>
                    </label>
                    <label className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        className='size-4 rounded border-[#D5D7DA]'
                      />
                      <span className='flex items-center gap-1'>
                        <Image
                          src='./star.svg'
                          width={20}
                          height={20}
                          className='size-4'
                          alt=''
                        />
                        4
                      </span>
                    </label>
                    <label className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        className='size-4 rounded border-[#D5D7DA]'
                      />
                      <span className='flex items-center gap-1'>
                        <Image
                          src='./star.svg'
                          width={20}
                          height={20}
                          className='size-4'
                          alt=''
                        />
                        3
                      </span>
                    </label>
                    <label className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        className='size-4 rounded border-[#D5D7DA]'
                      />
                      <span className='flex items-center gap-1'>
                        <Image
                          src='./star.svg'
                          width={20}
                          height={20}
                          className='size-4'
                          alt=''
                        />
                        2
                      </span>
                    </label>
                    <label className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        className='size-4 rounded border-[#D5D7DA]'
                      />
                      <span className='flex items-center gap-1'>
                        <Image
                          src='./star.svg'
                          width={20}
                          height={20}
                          className='size-4'
                          alt=''
                        />
                        1
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* <!-- KONTEN --> */}
            <div className='lg:col-span-9'>
              {/* <!-- header: showing + sort --> */}
              <div className='flex items-center justify-between mb-4'>
                <p className='text-sm text-[#6C727F]'>Showing 20 products</p>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-[#6C727F]'>Sort</span>
                  <select className='h-9 px-3 rounded-lg border border-[#D5D7DA] bg-white text-sm'>
                    <option>Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Top Rated</option>
                  </select>
                </div>
              </div>

              {/* <!-- GRID PRODUK --> */}
              {/* <!-- Product1 --> */}
              <div className='px-4 py-2 lg:p-0'>
                {isLoading && <Spinner className='size-15 mx-auto' />}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5'>
                  {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
              </div>
              {hasNextPage && (
                <div className='w-full items-center justify-center flex h-[150px]'>
                  <Button
                    className='w-[160px] lg:w-[220px] h-[48px] rounded-xl border-[1px] border-[#D5D7DA] p-2 font-sfpro-semi-bold text-[16px] leading-[30px] tracking-tighter mx-auto bg-transparent hover:bg-gray-200 text-black cursor-pointer'
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? 'Loading...' : 'Load More'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <FooterPage />
    </>
  );
};

export default CatalogPage;
