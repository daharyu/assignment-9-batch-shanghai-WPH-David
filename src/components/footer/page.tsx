import React from 'react';

import imgLogo from '../../../public/Logo.svg';
import Image from 'next/image';

const FooterPage = () => {
  return (
    <>
      <footer className='border-t border-[#E6E8EC] lg:py-20 lg:px-[150px] mt-12'>
        <div className='w-[393px] lg:w-[1200px] mx-auto px-4 lg:px-0 py-10'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
            {/* <!-- Brand + Desc + Social --> */}
            <div className='lg:col-span-6 flex flex-col gap-10 lg:w-[360px]'>
              <div className='flex flex-col gap-[22px]'>
                <div className='flex items-center gap-2 mb-3 logo'>
                  <Image
                    src={imgLogo}
                    alt='Shirt'
                    className='size-8 lg:size-[42px]'
                  />
                  <h3 className='font-sfpro-bold text-2xl'>Shirt</h3>
                </div>
                <p className='text-sm text-[#6C727F] leading-6 max-w-[520px] mb-5'>
                  Explore a realm of style with our fashion e-commerce platform,
                  where shopping is effortless. Experience a smooth journey with
                  an extensive selection of trendy apparel, all delivered
                  directly to your home.
                </p>
              </div>

              <div className='flex flex-col gap-5'>
                <p className='font-bold text-sm mb-3'>Follow on Social Media</p>
                <div className='flex items-center gap-3'>
                  {/* <!-- social round buttons (SVG, no lib needed) --> */}
                  <a
                    href='#'
                    aria-label='Facebook'
                    className='size-9 rounded-full border border-[#D5D7DA] flex items-center justify-center'
                  >
                    {/* <!-- FB --> */}
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M15 3h-2a4 4 0 0 0-4 4v2H7v3h2v9h3v-9h2.5l.5-3H12V7a1 1 0 0 1 1-1h2V3z'
                        fill='#0A0D12'
                      />
                    </svg>
                  </a>
                  <a
                    href='#'
                    aria-label='Instagram'
                    className='size-9 rounded-full border border-[#D5D7DA] flex items-center justify-center'
                  >
                    {/* <!-- IG --> */}
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                      <rect
                        x='3'
                        y='3'
                        width='18'
                        height='18'
                        rx='5'
                        stroke='#0A0D12'
                      />
                      <circle cx='12' cy='12' r='4' stroke='#0A0D12' />
                      <circle cx='17.5' cy='6.5' r='1.25' fill='#0A0D12' />
                    </svg>
                  </a>
                  <a
                    href='#'
                    aria-label='LinkedIn'
                    className='size-9 rounded-full border border-[#D5D7DA] flex items-center justify-center'
                  >
                    {/* <!-- IN --> */}
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M6.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5 8h3v11H5V8Zm6.5 0H15v1.8c.6-1.1 1.9-2.1 3.7-2.1 3 0 4.3 1.9 4.3 5V19h-3v-5c0-2-.7-3-2.2-3-1.7 0-2.6 1.1-2.6 3V19h-3V8Z'
                        fill='#0A0D12'
                      />
                    </svg>
                  </a>
                  <a
                    href='#'
                    aria-label='TikTok'
                    className='size-9 rounded-full border border-[#D5D7DA] flex items-center justify-center'
                  >
                    {/* <!-- TT --> */}
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M14 3c1 2.1 2.7 3.4 5 3.6V9c-1.9 0-3.5-.6-5-1.7v6.7a5.3 5.3 0 1 1-5.3-5.3c.2 0 .5 0 .7.1V11a2.5 2.5 0 1 0 1.8 2.4V3h2.8Z'
                        fill='#0A0D12'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* <!-- E-Commerce links --> */}
            <div className='lg:col-span-3'>
              <p className='font-bold text-sm mb-4'>E-Commerce</p>
              <ul className='flex flex-col gap-3 text-sm'>
                <li>
                  <a href='#' className='text-[#0A0D12]'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#' className='text-[#0A0D12]'>
                    Terms &amp; Condition
                  </a>
                </li>
                <li>
                  <a href='#' className='text-[#0A0D12]'>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='#' className='text-[#0A0D12]'>
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Help links --> */}
            <div className='lg:col-span-3'>
              <p className='font-bold text-sm mb-4'>Help</p>
              <ul className='flex flex-col gap-3 text-sm'>
                <li>
                  <a href='#' className='text-[#0A0D12]'>
                    How to Transact
                  </a>
                </li>
                <li>
                  <a href='#' className='text-[#0A0D12]'>
                    Payment Method
                  </a>
                </li>
                <li>
                  <a href='#' className='text-[#0A0D12]'>
                    How to Register
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterPage;
