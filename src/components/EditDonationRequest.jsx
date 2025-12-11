import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../components/Shared/Loading';
import { useQuery } from '@tanstack/react-query';
import { GoArrowLeft } from 'react-icons/go';
import useAxiosSecure from '../hooks/useAxiosSecure';

const EditDonationRequest = () => {
  const {id} = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const data = useLoaderData().sort((a, b) => a.district.localeCompare(b.district));

  const { data: request = {}, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_SERVER_API_URL}/donation-requests/${id}`);
      return result.data;
    },
  });

  const [selectedDistrict, setSelectedDistrict] = useState(request.recipientDistrict);
  const [selectedUpazila, setSelectedUpazila] = useState(request.recipientUpazila);
  const [triggerError, setTriggerError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  if (isProcessing || isLoading) return <Loading />

  const formSubmit = async(formData) => {
    if (!selectedDistrict || !selectedUpazila) {
      setTriggerError(true);
      return;
    }
    if (request.donationStatus !== 'pending') {
        return toast.error("Can't update this donation request");
    }

    setIsProcessing(true);
    setTriggerError(false);

    const updateReq = {
      recipientName: formData.recipientName,
      recipientDistrict: selectedDistrict,
      recipientUpazila: selectedUpazila,
      hospitalName: formData.hospitalName,
      fullAddress: formData.fullAddress,
      bloodGroup: formData.bloodGroup,
      donationDate: formData.donationDate,
      donationTime: formData.donationTime,
      requestMessage: formData.requestMessage,
    };

    try {
        await axiosSecure.patch(`${import.meta.env.VITE_SERVER_API_URL}/donation-requests/edit/${id}`, updateReq);
        toast.success("Successfully updated donation request");
        reset();
        setSelectedDistrict("");
        setSelectedUpazila("");
    }
    catch (err) {
        toast.error(err.message);
    }
    finally {setIsProcessing(false);}
  };

  return (
    <>

      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="bg-white shadow-lg rounded-3xl px-12 py-10 w-full max-w-[700px] relative">
            <span className="absolute top-6 left-6 text-(--primary-color) font-medium cursor-pointer hover:underline flex items-center gap-2" onClick={() => navigate(-1)}>
                        <GoArrowLeft size={26}/>Go Back
            </span>

          <h2 className="text-3xl font-bold mt-6 mb-8 text-center">
            Edit Donation Request form
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>

            <div>
              <label className="block mb-1 font-medium text-gray-800">Requester Name</label>
              <input
                type="text"
                readOnly
                value={user?.displayName || ""}
                className="w-full border border-gray-300 rounded-xl px-5 py-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">Requester Email</label>
              <input
                type="email"
                readOnly
                value={user?.email || ""}
                className="w-full border border-gray-300 rounded-xl px-5 py-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">Recipient Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
                placeholder="Enter recipient name"
                defaultValue={request.recipientName}
                required
                {...register("recipientName")}
              />
              {errors.recipientName && <p className="text-red-600 mt-1 ml-1">Required</p>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <div>
                <CustomDropdown
                  label="Recipient District"
                  options={data.map((d) => d.district)}
                  selected={selectedDistrict}
                  onSelect={(value) => {
                    setSelectedDistrict(value);
                    setSelectedUpazila("");
                  }}
                />
                {triggerError && !selectedDistrict && (
                  <p className="text-red-600 mt-1 ml-1">Please select district</p>
                )}
              </div>

              <div>
                <CustomDropdown
                  label="Recipient Upazila"
                  options={
                    selectedDistrict
                      ? data.find((d) => d.district === selectedDistrict)?.upazilas || []
                      : []
                  }
                  selected={selectedUpazila}
                  onSelect={setSelectedUpazila}
                />
                {triggerError && !selectedUpazila && (
                  <p className="text-red-600 mt-1 ml-1">Please select upazila</p>
                )}
              </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <div>
                <label className="block mb-1 font-medium text-gray-800">Donation Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
                  required
                  defaultValue={request.donationDate}
                  {...register("donationDate")}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-800">Donation Time</label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
                  required
                  defaultValue={request.donationTime}
                  {...register("donationTime")}
                />
              </div>

            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">Hospital Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
                placeholder="Hospital name"
                required
                defaultValue={request.hospitalName}
                {...register("hospitalName")}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">Full Address</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
                placeholder="Full address"
                required
                defaultValue={request.fullAddress}
                {...register("fullAddress")}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">Blood Group</label>
              <select
                className="w-full border border-gray-300 rounded-xl px-5 py-3 bg-white outline-none cursor-pointer focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
                {...register("bloodGroup")}
                defaultValue={request.bloodGroup}
              >
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">Request Message</label>
              <textarea
                placeholder="Explain why blood is needed"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none h-28 focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
                {...register("requestMessage")}
                defaultValue={request.requestMessage}
              ></textarea>
            </div>

            {
                request.donationStatus === 'pending' ? <button type="submit" className="primary-btn w-full">
                    Edit Request Data
                </button> : 
                <h1 className='text-red-500 text-center'>You can't update this donation request.</h1>
            }

          </form>
        </div>
      </div>
    </>
  );
};


const CustomDropdown = ({ label, options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block mb-1 font-medium text-gray-800">{label}</label>

      <div
        className="w-full border border-gray-300 rounded-xl px-5 py-3 bg-white outline-none cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {selected || "Select an option"}
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 max-h-44 overflow-y-auto bg-white border border-gray-300 rounded-xl shadow-lg z-20">
          {options.length > 0 ? (
            options.map((item) => (
              <div
                key={item}
                className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(item);
                  setOpen(false);
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-5 py-2 text-gray-400">No options</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditDonationRequest;
