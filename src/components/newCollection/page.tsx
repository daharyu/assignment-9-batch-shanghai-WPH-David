import React from 'react';
import imgPeople from '../../../public/imgPeople.svg';
import Image from 'next/image';
import { Button } from '../ui/button';

const NewCollectionSection = () => {
  return (
    <>
      <section className='px-4 py-4 pt-6 lg:p-0 flex gap-2 items-center justify-center lg:mb-10'>
        <div className='relative w-[361px] h-[183px] lg:w-[1200px] lg:h-[340px] bg-[#F3D7A4] rounded-xl lg:rounded-2xl'>
          {/* <!-- Image --> */}
          <Image
            src={imgPeople}
            className='absolute top-[-2px] size-[185px] lg:size-auto lg:top-[5px] lg:left-[48px]'
            alt=''
          />
          <div className='absolute top-[47px] lg:top-[93px] left-[180px] lg:left-[514px] flex flex-col gap-3 lg:gap-4'>
            {/* <!-- Home Description --> */}
            <div className='w-[169px] lg:w-[500px] flex flex-col gap-1 lg:gap-4'>
              <h2 className='font-bold text-[16px] lg:text-[56px] lg:leading-[68px] tracking-tighter text-[#553E32]'>
                NEW COLLECTION
              </h2>
              <p className='text-[#553E32] font-semibold tracking-tighter leading-5 text-[10px] lg:text-2xl'>
                Stylish men&apos;s apparel for every occasion
              </p>
            </div>
            <Button className='w-[93px] lg:w-[180px] h-[28px] lg:h-[48px] rounded-md lg:rounded-lg bg-[#0A0D12] text-[#FFFFFF] font-sfpro-semi-bold tracking-tighter text-[10px] lg:text-[16px] font-[600]'>
              Get Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewCollectionSection;
