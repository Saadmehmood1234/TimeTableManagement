import TeacherCard from "@/components/home/TeacherCard";
import TimeTableContainer from "@/components/home/TimeTableContainer";
const HomePage = () => {
  return (
    <div className="bg-[#F7E3EC] w-full h-screen pt-16 relative">
      <TimeTableContainer />
    
      <div className="w-full flex flex-col gap-2 justify-center items-center ">

        <hr  className="text-black h-2 w-full"/>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#333333]">DBIT Heros</h1>
          <p className="mt-2 text-lg text-gray-700 font-medium italic">
            Meet the passionate educators who are shaping the future, one lesson at a time.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap w-full justify-center items-center">
          {
            new Array(14).fill(1).map((_,index)=>{
              return <TeacherCard key={index}/>
            })
          }
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
