import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    
    <div className=" h-screen w-screen p-10 justify-center items-center flex flex-col ">
      <div  className='w-full max-w-5xl top-10  mx-auto flex justify-between items-center absolute'>
        <Link href = {'/'}>
          <Button variant={'outline'} ><ChevronLeft/>Go back</Button>
        </Link>
      </div>
      {children}
       
    </div> 
  )
}
