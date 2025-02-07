'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

function Nav() {
const pathname = usePathname()
   return (
      <nav className="h-12 w-full flex px-8 gap-6 justify-end items-center bg-black text-white">
         <Link
            href="/"
            className={`text-[1rem] px-3 py-1 rounded-md ${pathname === "/" ? "bg-white text-black" : "hover:bg-gray-800"
               }`}
         >
            Home
         </Link>
         <Link
            prefetch
            href="/scheduler"
            className={`text-[1rem] px-3 py-1 rounded-md ${pathname === "/scheduler"
                  ? "bg-white text-black"
                  : "hover:bg-gray-800"
               }`}
         >
            TimeLine Calendar
         </Link>
         <Link
            href="https://github.com/Rachit2833"
            className={`text-[1rem] px-3 py-1 rounded-md ${pathname === "/github-profile"
                  ? "bg-white text-black"
                  : "hover:bg-gray-800"
               }`}
         >
            Github Profile
         </Link>
      </nav>
   )
}

export default Nav
