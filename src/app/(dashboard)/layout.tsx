import MenuItems from "@/_components/MenuItems";
import Navbar from "@/_components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <div className="h-screen flex">
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4"> 
          <Link href='/' className="flex items-center justify-center lg:justify-start gap-2">

          <Image src='/logo.png' alt="logo" width={32} height={32}/>
          <span className="hidden lg:block xl:block font-bold text-gray-800"  >SS Education</span>
          </Link>
          <MenuItems/>
        </div>
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-y-scroll scroll-smooth  flex flex-col ">
          <Navbar/>
          <div className="h-[90%]  overflow-y-scroll scrollbar-hide scroll-smooth flex-1">
                  {children}

          </div>
        </div>
      </div>

  );
}
