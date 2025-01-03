import Link from "next/link";
import {cookies} from "next/headers";
const Navbar = async() => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth-token");
  return (
    <div className="w-[90%] bg-[#4B3F72] py-3 px-10 m-auto rounded-md text-white flex justify-between max-sm:text-[15px] max-sm:w-[100%] max-sm:rounded-none max-sm:px-2 ">
      <div>
        <h1 className="text-2xl font-semibold drop-shadow-md">DBIT</h1>
      </div>
      <div className="flex justify-center items-center gap-5 max-sm:gap-2 text-[#e2e2e2]">
        <Link href={"/teacher"}>Teachers</Link>
        <Link href={"/statistic"}>Statistics</Link>
        {
          authCookie?.value ?<Link href={"/timetable"}>Time Table</Link>:<Link href={"/login"}><button className="w-[100px] h-[30px] text-[16px] rounded bg-[#18113d] text-white font-semibold">
          Login
        </button>
        </Link>
        }
        
       
      </div>
    </div>
  );
};

export default Navbar;
