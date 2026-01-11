import useAuth from "../hooks/useAuth";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiDroplet,
  FiUser,
  FiMail,
} from "react-icons/fi";
import { TbProgressHelp } from "react-icons/tb";
import { FaRegHospital } from "react-icons/fa";
import { MdOutlineMyLocation } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLoaderData, useNavigate, useRevalidator } from "react-router";
import { useState } from "react";
import DonationModal from "./Modals/DonationModal";
import useRole from "../hooks/useRole";
import Loading from "./Shared/Loading";
import NotFound from "./Notfound";

const DonationRequestDetails = () => {
  const [modalShow, setModalShow] = useState(false);
  const [processingCount, setProcessingCount] = useState(0);
  const [role, isRoleLoading] = useRole();
  const revalidator = useRevalidator();
  const {user} = useAuth();
  const req = useLoaderData();
  const navigate = useNavigate();

  if (isRoleLoading) return <Loading />

  if (!req) return <NotFound />


  const statusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "inprogress":
        return "bg-blue-100 text-blue-700";
      case "done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <>
      {
				modalShow && <DonationModal req={req} user={user} setModalShow={setModalShow} setProcessingCount={setProcessingCount} processingCount={processingCount} revalidator={revalidator}/>
			}
    <div className="space-y-6">

      <div className="bg-primary-bg rounded-3xl p-8 shadow-md border border-gray-300/40">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">

            <div>
              <p className="text-sm font-medium">Recipient Name</p>
              <h2 className="text-2xl font-bold">
                {req.recipientName}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <FiMapPin className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-primary-text/60">Location</p>
                <p className="text-lg font-semibold">
                  {req.recipientDistrict}, {req.recipientUpazila}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <FaRegHospital className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-primary-text/60">Hospital</p>
                <p className="text-lg font-semibold">{req.hospitalName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <MdOutlineMyLocation className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-primary-text/60">Full Address</p>
                <p className="text-lg font-semibold">{req.fullAddress}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${statusStyle(req.donationStatus)}`}>
                <TbProgressHelp size={24} />
              </div>
              <div>
                <p className="text-sm text-primary-text/60">Donation Status</p>
                <p className="text-lg font-semibold">{req.donationStatus}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <FiDroplet className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-primary-text/60">Blood Group</p>
                <p className="text-lg font-semibold">{req.bloodGroup}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <FiCalendar className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-primary-text/60">Donation Date</p>
                <p className="text-lg font-semibold">{req.donationDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <FiClock className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-primary-text/60">Donation Time</p>
                <p className="text-lg font-semibold">{req.donationTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <FiUser className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-primary-text/60">Requester</p>
                <p className="font-semibold">{req.requesterName}</p>
                <p className="text-sm flex gap-1 items-center">
                  <FiMail size={14} /> {req.requesterEmail}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <FiUser className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-primary-text/60">Donor info</p>
                <p className="font-semibold">{req.donorName ? req.donorName : "..."}</p>
                <p className="text-sm flex gap-1 items-center">
                  {
                    req.donorEmail ? <><FiMail size={14} /> {req.donorEmail}</> : "..."
                  }
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-primary-bg rounded-3xl p-6 shadow-md border border-gray-300/40">
        <h3 className="text-xl font-semibold mb-3">
          Request Message
        </h3>
        <p className="text-primary-text/60 leading-relaxed">
          {req.requestMessage}
        </p>
      </div>

        <div className="flex items-center gap-4 justify-center">
          <button className="secondery-btn flex items-center gap-1" onClick={() => navigate(-1)}><IoIosArrowRoundBack size={30}/>Go Back</button>
          {
            role === 'donor' && req.donationStatus === "pending" && req.requesterEmail !== user.email && <button className="primary-btn" onClick={() => setModalShow(true)}>Donate</button>
          }
        </div>
          {
            !user && <p className="text-2xl text-center">Login to Donate Blood</p>
          }

    </div>
    </>
  );
};

export default DonationRequestDetails;
