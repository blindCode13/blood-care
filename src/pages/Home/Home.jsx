import BannerImg from "../../assets/BannerImg.png";
import BannerBg from "../../assets/BannerBg.jpg";

const Home = () => {
  return (
    <div>
      <div
        className="flex items-center justify-center gap-12 rounded-3xl px-8 py-26 bg-size-[50rem] relative overflow-hidden"
        style={{ backgroundImage: `url(${BannerBg})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#ffffffea] backdrop-blur-[2px] z-10"></div>

        <div className="flex flex-col xl:items-start items-center z-20">
          <div className="text-5xl md:text-7xl font-bold text-center xl:text-start xl:text-6xl">
            <h1>
              DONATE <span className="text-(--primary-color)">BLOOD</span>
            </h1>
            <h1>
              <span className="text-(--primary-color)">SHARE</span> LIFE
            </h1>
          </div>
          <p className="my-4 text-center xl:text-start">
            Your generosity today becomes the strength someone depends<br></br>{" "}
            tomorrow, a reminder that every drop truly matters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="primary-btn">Join as a donor</button>
            <button className="secondery-btn">Search Donors</button>
          </div>
        </div>
        <img
          src={BannerImg}
          className="xl:flex hidden max-w-[600px] z-20"
        ></img>
      </div>

      <div>
        <section className="mt-24 px-6 lg:px-12 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center items-center lg:items-start">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Why BloodCare?
              </h2>

              <p className="text-gray-700 text-base lg:text-lg mb-6 max-w-xl text-center lg:text-start">
                BloodCare connects willing donors with patients and hospitals in
                need, simplifying the donation process and making lifesaving
                blood more accessible. Our platform blends real-time requests,
                secure communication, and trusted profiles to ensure timely,
                reliable support when it matters most.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-stretch">
                <div className="bg-white shadow-md w-28 flex items-center justify-center relative rounded-l-xl">
                  <h2 className="text-3xl font-bold">01</h2>
                  <div className="absolute -right-3 top-3 w-6 h-6 bg-white rounded-full"></div>
                  <div className="absolute -right-3 bottom-3 w-6 h-6 bg-white rounded-full"></div>
                </div>

                <div className="bg-(--primary-color) text-white flex-1 p-6 rounded-r-xl shadow-md">
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
                <div className="bg-white shadow-md w-28 flex items-center justify-center relative rounded-l-xl">
                  <h2 className="text-3xl font-bold">02</h2>
                  <div className="absolute -right-3 top-3 w-6 h-6 bg-white rounded-full"></div>
                  <div className="absolute -right-3 bottom-3 w-6 h-6 bg-white rounded-full"></div>
                </div>

                <div className="bg-(--primary-color) text-white flex-1 p-6 rounded-r-xl shadow-md">
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
                <div className="bg-white shadow-md w-28 flex items-center justify-center relative rounded-l-xl">
                  <h2 className="text-3xl font-bold">03</h2>
                  <div className="absolute -right-3 top-3 w-6 h-6 bg-white rounded-full"></div>
                  <div className="absolute -right-3 bottom-3 w-6 h-6 bg-white rounded-full"></div>
                </div>

                <div className="bg-(--primary-color) text-white flex-1 p-6 rounded-r-xl shadow-md">
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

        <section className="mt-24 mb-10 px-6 lg:px-12 max-w-[1200px] mx-auto">
          <div className="bg-white rounded-3xl shadow-md p-10 lg:p-14">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Contact Us</h2>

            <p className="text-gray-600 max-w-2xl mb-10">
              Have questions, need assistance, or want to learn more about
              BloodCare? Our team is here to help. Reach out to us through any
              of the channels below.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-semibold">Email</h4>
                <p className="text-gray-700">support@bloodcare.org</p>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-semibold">Phone</h4>
                <p className="text-gray-700">+1 (555) 238-9041</p>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-semibold">Office</h4>
                <p className="text-gray-700">
                  14 Crescent Avenue,
                  <br />
                  Redwood City, CA 94063
                </p>
              </div>
            </div>

            <div className="my-10 h-px bg-gray-200"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
