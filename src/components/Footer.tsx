import { Linkedin, Instagram, Github } from "lucide-react"; // Import Lucide Icons
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#4B3F72] text-white py-8 mt-10">
      <div className="w-full max-w-[1200px] m-auto flex flex-col gap-8">
        {/* Top Section - College Info and Links */}
        <div className="flex flex-wrap justify-between gap-8">
    
          <div className="w-full sm:w-1/3">
            <h3 className="text-xl font-semibold mb-4">About DBIT</h3>
            <p className="text-sm">
              DBIT is one of the leading institutes in the region, providing
              world-class education and training to shape future leaders. Join
              us for Link transformative educational experience.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold mb-4">Follow us</h3>
            <div className="flex gap-2">
            <Link
                href="https://www.linkedin.com/in/kamlesh-sahani"
                target="_blank"
                rel="noopener noreferrer"
              >
                
                <Linkedin className="w-8 h-8 hover:text-white text-[#0077b5]" />
              </Link>
              <Link
                href="https://www.instagram.com/kamlesh_sahani"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-8 h-8 hover:text-white text-[#E4405F]" />
              </Link>
              <Link
                href="https://github.com/kamlesh-Sahani"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-8 h-8 hover:text-white text-[#6e5494]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">

        <div className="text-center text-xs mt-6">
            <p>&copy; {new Date().getFullYear()} DBIT. All rights reserved.</p>
            <p className="text-sm">
              <Link href="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>{" "}
              |{" "}
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-start">
            <p className="font-medium">Website created by</p>
    
            <Link
                href="https://www.linkedin.com/in/kamlesh-sahani"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline flex gap-2 items-center text-sm ml-2"
              >
                 Kamlesh Sahani
                 <Linkedin className="w-5 h-5 hover:text-white text-[#0077b5]" />
               
              </Link>{" "}
            
            
           
           
              <Link
                href="https://www.linkedin.com/in/saad-mehmood-4a6036255/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline flex gap-2 items-center text-sm ml-2"
              >
                  Saad Mehmood
                 <Linkedin className="w-5 h-5 hover:text-white text-[#0077b5]" />
              
              </Link>
            
          </div>

     
         
        </div>
      </div>
    </div>
  );
};

export default Footer;
