import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-[90%] bg-[#4B3F72] py-3 px-10 m-auto rounded-md text-white flex justify-between">
      <div>
        <h1 className="text-2xl font-semibold drop-shadow-md">DBIT</h1>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Link href={"/teacher"}>Teachers</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/login"}>
        <button className="w-[100px] h-[30px] text-[16px] rounded bg-[#18113d] text-white font-semibold">
          Login
        </button>
        </Link>
       
      </div>
    </div>
  );
};

export default Navbar;
