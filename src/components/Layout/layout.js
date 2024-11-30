import Navbar from '../Header/index.js';
import Footer from '../Footer/index.js';
 
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
        <main className='bg-[#0F0F20]'>{children}</main>
      <Footer />
    </>
  )
}