import BannerImg from '../assets/BannerImg.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { FaUserPlus, FaHeartbeat, FaBell, FaShieldAlt, FaHandHoldingHeart } from "react-icons/fa";
import { MdBloodtype, MdVerified } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div>
      <div
        className="rounded-3xl py-26 relative overflow-hidden bg-primary-bg"
      >
        <div className='flex items-center justify-center xl:justify-between gap-12 max-w-380 mx-auto px-6 lg:px-12'>
          <div className="flex flex-col xl:items-start items-center z-10">
            <div className="text-5xl md:text-7xl font-bold text-center xl:text-start xl:text-6xl">
              <h1>
                DONATE <span className="text-primary">BLOOD</span>
              </h1>
              <h1>
                <span className="text-primary">SHARE</span> LIFE
              </h1>
            </div>
            <p className="my-4 text-center xl:text-start">
              Your generosity today becomes the strength someone depends<br></br>{" "}
              tomorrow, a reminder that every drop truly matters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {
                !user && <button className="primary-btn" onClick={() => navigate("/register")}>Join as a donor</button>
              }
              <button className="secondery-btn" onClick={() => navigate("/search-donors")}>Search Donors</button>
            </div>
          </div>
          <img
            src={BannerImg}
            className="xl:flex hidden max-w-[600px] z-20"
          ></img>
        </div>
      </div>

      <div className='mt-24 space-y-24'>
        <section className="px-6 lg:px-12 max-w-380 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center items-center lg:items-start">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Why BloodCare?
              </h2>

              <p className="text-base lg:text-lg mb-6 max-w-xl text-center lg:text-start">
                BloodCare connects willing donors with patients and hospitals in
                need, simplifying the donation process and making lifesaving
                blood more accessible. Our platform blends real-time requests,
                secure communication, and trusted profiles to ensure timely,
                reliable support when it matters most.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-stretch">
                <div className="bg-primary-bg shadow-md w-28 flex items-center justify-center relative rounded-l-xl">
                  <h2 className="text-3xl font-bold">01</h2>
                  <div className="absolute -right-3 top-3 w-6 h-6 bg-primary-bg rounded-full"></div>
                  <div className="absolute -right-3 bottom-3 w-6 h-6 bg-primary-bg rounded-full"></div>
                </div>

                <div className="bg-primary text-white flex-1 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-1">
                    Smart Donor Matching
                  </h3>
                  <p className="text-sm opacity-90">
                    Connect donors with patients based on urgency, proximity,
                    and blood type.
                  </p>
                </div>
              </div>

              <div className="flex items-stretch">
                <div className="bg-primary-bg shadow-md w-28 flex items-center justify-center relative rounded-l-xl">
                  <h2 className="text-3xl font-bold">02</h2>
                  <div className="absolute -right-3 top-3 w-6 h-6 bg-primary-bg rounded-full"></div>
                  <div className="absolute -right-3 bottom-3 w-6 h-6 bg-primary-bg rounded-full"></div>
                </div>

                <div className="bg-primary text-white flex-1 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-1">
                    Real-Time Requests
                  </h3>
                  <p className="text-sm opacity-90">
                    Live requests from hospitals and verified recipients so
                    donors can act quickly.
                  </p>
                </div>
              </div>

              <div className="flex items-stretch">
                <div className="bg-primary-bg shadow-md w-28 flex items-center justify-center relative rounded-l-xl">
                  <h2 className="text-3xl font-bold">03</h2>
                  <div className="absolute -right-3 top-3 w-6 h-6 bg-primary-bg rounded-full"></div>
                  <div className="absolute -right-3 bottom-3 w-6 h-6 bg-primary-bg rounded-full"></div>
                </div>

                <div className="bg-primary text-white flex-1 p-6 rounded-r-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-1">
                    Secure Communication
                  </h3>
                  <p className="text-sm opacity-90">
                    Message recipients safely through the platform without
                    exposing personal contact details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 max-w-380 mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-14">
            How BloodCare Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="bg-primary-bg rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">
              <FaUserPlus className="text-primary text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
              <p className="text-sm text-primary-text/70">
                Register as a donor with your blood type and basic information.
              </p>
            </div>

            <div className="bg-primary-bg rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">
              <MdBloodtype className="text-primary text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-sm text-primary-text/70">
                Get matched based on blood type, urgency, and location.
              </p>
            </div>

            <div className="bg-primary-bg rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">
              <FaBell className="text-primary text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Requests</h3>
              <p className="text-sm text-primary-text/70">
                Receive real-time alerts when someone needs your help.
              </p>
            </div>

            <div className="bg-primary-bg rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">
              <FaHandHoldingHeart className="text-primary text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Donate & Save</h3>
              <p className="text-sm text-primary-text/70">
                Connect securely and make a life-saving donation.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 max-w-380 mx-auto">
          <div className="bg-primary-bg rounded-3xl p-12 shadow-md">
            <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-center">
              Who Can Donate
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="border border-gray-300/40 rounded-2xl p-8 text-center hover:shadow-lg transition">
                <FaHeartbeat className="text-primary text-4xl mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Healthy Individuals</h4>
                <p className="text-sm text-primary-text/60">
                  Most healthy adults can donate and make a meaningful impact.
                </p>
              </div>

              <div className="border border-gray-300/40 rounded-2xl p-8 text-center hover:shadow-lg transition">
                <MdBloodtype className="text-primary text-4xl mx-auto mb-4" />
                <h4 className="font-semibold mb-2">All Blood Types</h4>
                <p className="text-sm text-primary-text/60">
                  Every blood group is needed and valued.
                </p>
              </div>

              <div className="border border-gray-300/40 rounded-2xl p-8 text-center hover:shadow-lg transition">
                <MdVerified className="text-primary text-4xl mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Safe & Verified</h4>
                <p className="text-sm text-primary-text/60">
                  Donation processes are guided by safety-first practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 max-w-380 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                Trusted & Secure
              </h2>

              <ul className="space-y-6 text-primary-text/70">
                <li className="flex items-start gap-4">
                  <FaShieldAlt className="text-primary text-2xl mt-1" />
                  <span>Verified donor and recipient profiles</span>
                </li>

                <li className="flex items-start gap-4">
                  <MdVerified className="text-primary text-2xl mt-1" />
                  <span>Secure, private in-platform messaging</span>
                </li>

                <li className="flex items-start gap-4">
                  <HiOutlineLocationMarker className="text-primary text-2xl mt-1" />
                  <span>Location-based matching without exposing addresses</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary-bg rounded-3xl p-12 shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Built on Trust
              </h3>
              <p className="text-primary-text/60">
                BloodCare prioritizes privacy, safety, and transparency to ensure
                donors feel confident every step of the way.
              </p>
            </div>
          </div>
        </section>


        <section className="mb-24 px-6 lg:px-12 max-w-380 mx-auto">
          <div className="bg-primary-bg rounded-3xl shadow-md p-10 lg:p-14">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Contact Us</h2>

            <p className="max-w-2xl mb-10 text-primary-text/60">
              Have a question, need help, or want to share feedback? Reach out
              using the form below or through our contact details.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-semibold">Email</h4>
                  <p className="text-primary-text/60">support@bloodcare.org</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold">Phone</h4>
                  <p className="text-primary-text/60">+1 (555) 238-9041</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold">Office</h4>
                  <p className="text-primary-text/60">
                    14 Crescent Avenue, <br />
                    Redwood City, CA 94063
                  </p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                toast.success("Your message has been sent. Thanks for connecting with us.");
                e.target.reset();
              }}>
                <div>
                  <label className="block mb-1 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-400/50 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-400/50 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="yourname@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-400/50 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Message
                  </label>
                  <textarea
                    className="w-full border border-gray-400/50 rounded-xl px-4 py-3 h-32 resize-none outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="primary-btn w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
