import Image from "next/image";

export default function Layout({ children }: {children: React.ReactNode}) {
  return ( 
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div>
        <Image draggable = {false} src="/brand/logo.svg" alt="Zimbo logo" width={100} height={32} />
      </div>
      {children} 
    </div> 
  )
}
