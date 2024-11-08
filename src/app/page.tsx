import * as motion from "framer-motion/client"
import Link from "next/link";
const HomePage = async() => {
  return (  
    <motion.div className="bg-back text-white flex flex-col gap-6  items-center pb-24 justify-center">
      <motion.h1 initial={{opacity:0.4, y:-140}} whileInView={{opacity:1,y:0}} transition={{delay:0.2}} className="text-7xl font-bold mb-2 leading-tight drop-shadow-sm max-sm:text-4xl text-center">Elevate Your <span className="text-blue-700">Academic Life</span> with Our <span className="text-blue-700">Smart</span> Scheduling <span className="text-blue-700"> Solution</span></motion.h1>
      
       <motion.p initial={{opacity:0.7, y:-100}} whileInView={{opacity:1,y:0}} transition={{delay:0.1}} className="text-2xl w-[60%] text-center font-medium">
        Simplify your academic life with our cutting-edge timetable system. Enjoy <span className="text-blue-600">real-time updates</span> and <span className="text-blue-600">personalized schedules</span> designed to keep you ahead of the curve.
      </motion.p>
      <Link href={"/timetable"}>
      <motion.button initial={{opacity:0.8, y:-100}} whileInView={{opacity:1,y:0}} transition={{delay:0}}  className="w-[310px] h-[50px] rounded text-back bg-blue-700 font-semibold text-xl hover:bg-blue-500"> Get Started</motion.button>
      </Link>
    </motion.div>
  )
}

export default HomePage