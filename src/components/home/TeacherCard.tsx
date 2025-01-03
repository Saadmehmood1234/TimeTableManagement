const TeacherCard = () => {
    return (
      <div className="bg-white w-[300px] p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex gap-4 justify-center items-center cursor-pointer">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5E4B8B] to-[#9F6AA5] flex items-center justify-center">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
        </div>
  
        {/* Teacher Details */}
        <div className="flex flex-col gap-1 items-center justify-center w-full ">
          <h1 className="text-xl font-semibold text-[#333333] truncate">Amandeep Singh</h1>
          <p className="text-sm text-gray-600 font-medium">
            Assistant Professor
          </p>
        </div>
      </div>
    );
  };
  
  export default TeacherCard;
  