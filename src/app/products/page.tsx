'use client';
import FooterPage from '@/components/footer/page';
import Header from '@/components/header/page';
import NewCollectionSection from '@/components/newCollection/page';
import ProductCard from '@/components/productCard/page';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getAllProducts } from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

type productData = {
  id: number | string;
  title: string;
  price: number;
  slug: string;
  image: string;
  rating: number;
  soldCount: number;
};

type pagination = {
  page: number;
  totalPages: number;
};

const Products = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });
  const products: productData[] = data?.data.products || [];
  const pagination: pagination = data?.data.pagination || {};
  return (
    <>
      <Header />
      <NewCollectionSection />
      <section className='w-[393px] lg:w-[1200px] justify-center mx-auto flex flex-col gap-2 lg:gap-10'>
        <div className='px-4 py-2 lg:p-0'>
          <h1 className='sub-judul mb-2.5 lg:mb-7'>Featured Product</h1>
          {isLoading && <Spinner className='size-15 mx-auto' />}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5'>
            {products.map((product: productData) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
        {pagination.page < pagination.totalPages && (
          <Button className='w-[160px] lg:w-[220px] h-[48px] rounded-xl border-[1px] border-[#D5D7DA] p-2 font-sfpro-semi-bold text-[16px] leading-[30px] tracking-tighter mx-auto bg-transparent hover:bg-gray-200 text-black cursor-pointer'>
            Load More
          </Button>
        )}
      </section>

      <FooterPage />
    </>
  );
};

export default Products;
