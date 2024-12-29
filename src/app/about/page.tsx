import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-[#F7E3EC] min-h-screen pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#7D497C] leading-tight transition-all duration-300 hover:tracking-wider">
            About Don Bosco Institute of Technology
          </h1>
          <p className="text-xl text-[#7D497C] mt-4 opacity-80 transition-all duration-300 hover:opacity-100">
            Your gateway to quality education and a bright future
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="flex flex-col sm:flex-row gap-8 mb-16">
          <div className="w-full sm:w-1/2 p-6 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h2 className="text-3xl font-semibold text-[#7D497C] mb-4">Mission</h2>
            <p className="text-lg text-gray-700">
              Our mission is to provide high-quality education that fosters innovation, creativity, and leadership. We strive to nurture the holistic development of students by providing a supportive and stimulating learning environment.
            </p>
          </div>
          <div className="w-full sm:w-1/2 p-6 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h2 className="text-3xl font-semibold text-[#7D497C] mb-4">Vision</h2>
            <p className="text-lg text-gray-700">
              Our vision is to be a leading institution in nurturing professionals who are not only academically proficient but also equipped with the values and skills required to excel in a rapidly changing world.
            </p>
          </div>
        </div>

        {/* History */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-16 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-semibold text-[#7D497C] mb-4">Our History</h2>
          <p className="text-lg text-gray-700">
            Established in the year 2001, Don Bosco Institute of Technology has been at the forefront of education, offering a wide array of undergraduate and postgraduate programs in technology. With an ever-growing list of achievements and accolades, we have emerged as one of the top institutes in the region.
          </p>
        </div>

        {/* Accreditation and Awards */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-16 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-semibold text-[#7D497C] mb-4">Accreditation & Awards</h2>
          <p className="text-lg text-gray-700">
            Don Bosco Institute of Technology is accredited by the National Board of Accreditation (NBA) and affiliated with Guru Gobind Singh Indraprastha University (GGSIPU). We are proud to have received numerous awards for academic excellence and student innovation.
          </p>
        </div>

        {/* Facilities */}
        <div className="flex flex-col sm:flex-row gap-8 mb-16">
          <div className="w-full sm:w-1/2 p-6 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h2 className="text-3xl font-semibold text-[#7D497C] mb-4">State-of-the-Art Facilities</h2>
            <p className="text-lg text-gray-700">
              Our campus is equipped with modern infrastructure, including fully-equipped labs, a well-stocked library, sports facilities, and smart classrooms, ensuring an ideal learning environment for all students.
            </p>
          </div>
          <div className="w-full sm:w-1/2 p-6 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h2 className="text-3xl font-semibold text-[#7D497C] mb-4">Research and Innovation</h2>
            <p className="text-lg text-gray-700">
              We encourage research and innovation among our students and faculty, offering ample opportunities for projects, publications, and collaborations with the industry.
            </p>
          </div>
        </div>

        {/* Faculty Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-[#7D497C] mb-4">Meet Our Faculty</h2>
          <p className="text-lg text-gray-700 mb-8 opacity-80 transition-all duration-300 hover:opacity-100">
            Our faculty members are highly qualified and dedicated to providing the best education. They bring their industry experience and academic expertise to help students achieve their goals.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden transition-transform transform hover:scale-105 duration-300">
              <img
                src="https://via.placeholder.com/150"
                alt="Faculty"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden transition-transform transform hover:scale-105 duration-300">
              <img
                src="https://via.placeholder.com/150"
                alt="Faculty"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Add more faculty images here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
