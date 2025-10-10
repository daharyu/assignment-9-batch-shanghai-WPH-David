'use client';
import FooterPage from '@/components/footer/page';
import Header from '@/components/header/page';
import NewCollectionSection from '@/components/newCollection/page';
import ProductCard from '@/components/productCard/page';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getProductInfinite } from '@/services/product.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { number } from 'zod';

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

const Products = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ProductResponse, Error>({
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
    data?.pages.flatMap((page) => page.data.products) || [];

  return (
    <>
      <Header />
      <NewCollectionSection />
      <section className='w-[393px] lg:w-[1200px] justify-center mx-auto flex flex-col gap-2 lg:gap-10'>
        <div className='px-4 py-2 lg:p-0'>
          <h1 className='sub-judul mb-2.5 lg:mb-7'>Featured Product</h1>
          {isLoading && <Spinner className='size-15 mx-auto' />}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5'>
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
        {hasNextPage && (
          <Button
            className='w-[160px] lg:w-[220px] h-[48px] rounded-xl border-[1px] border-[#D5D7DA] p-2 font-sfpro-semi-bold text-[16px] leading-[30px] tracking-tighter mx-auto bg-transparent hover:bg-gray-200 text-black cursor-pointer'
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </section>

      <FooterPage />
    </>
  );
};

export default Products;
