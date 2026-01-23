import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { id: 1, text: 'Home', link: '/' },
  { id: 2, text: 'Cars', link: '/cars' },
];

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='bg-[#3F4F45] h-12 w-full top-0 left-0 z-50 flex justify-between items-center p-4 shadow-xl/30 border-b-2 border-black'>

      <h1 className='w-full text-3xl font-bold text-accent text-left'>Cars</h1>

      <ul className='flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-234C6A rounded-full m-2 cursor-pointer duration-300 hover:text-black'
          >
            <Link to={item.link}>
              {item.text}
            </Link>

          </li>
        ))}
      </ul>

      <div onClick={handleNav} className='block md:hidden'>

      </div>
    </div>
  );
};

export default Navbar;
