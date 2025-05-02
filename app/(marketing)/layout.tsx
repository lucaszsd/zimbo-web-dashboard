
import Navbar from '@/components/navbar';
export default function Layout({children}: {children: React.ReactNode}) {
     
  return (
    <>
        {/* here goes navbar */}

        <Navbar />
        {/* {JSON.stringify(user)} */}
        {children}
    </>
  )
}
