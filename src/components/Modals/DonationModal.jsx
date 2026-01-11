
import ModalContainer from "./ModalContainer";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Shared/Loading";

const DonationModal = ({
  req,
  user,
  setModalShow,
  processingCount,
  setProcessingCount,
  revalidator
}) => {

  const axiosSecure = useAxiosSecure();
  const {data: resData = {}, isLoading } = useQuery({
    queryKey: ['email'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_SERVER_API_URL}/bloodType/${user.email}`);
      return result.data
    }
  });

  if (isLoading) return <Loading />

  return (
    <ModalContainer>
      <div>
        <form>
          <div>
            <label className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="email"
              className="w-full border border-gray-400/50 bg-primary-text/8 rounded-xl px-5 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              defaultValue={user.displayName}
              disabled
            />
          </div>

          <div className="mt-4">
            <label className="block mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-400/50 bg-primary-text/8 rounded-xl px-5 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              defaultValue={user.email}
              disabled
            />
          </div>
        </form>

        {
          resData.bloodGroup === req.bloodGroup ? 
          <div className="flex justify-center gap-3 mt-6">
          <button
            className="secondery-btn cursor-pointer"
            onClick={() => setModalShow(false)}
          >
            Cancel
          </button>
          <button
            className="primary-btn cursor-pointer"
            onClick={async () => {
              try {
                await axiosSecure.patch(`${import.meta.env.VITE_SERVER_API_URL}/donate/${req._id}`, {name: user.displayName, email: user.email});
                setProcessingCount(processingCount + 1);
                toast.success("Accepted donation request");
              } catch (err) {
                toast.error(err.message);
              } finally {
                setModalShow(false);
                revalidator.revalidate();
              }
            }}
          >
            Confirm
          </button>
        </div> : 
        <>
          <h1 className="text-center text-red-500 mt-5">You can't donate to this request as your blood group is not matched.</h1>
          <div className="flex items-center justify-center mt-4">
            <button className="primary-btn" onClick={() => setModalShow(false)}>Close</button>
          </div>
        </>
        }
      </div>
    </ModalContainer>
  );
};

export default DonationModal;
