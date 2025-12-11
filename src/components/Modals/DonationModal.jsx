
import ModalContainer from "./ModalContainer";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DonationModal = ({
  req,
  user,
  setModalShow,
  processingCount,
  setProcessingCount,
  revalidator
}) => {
  const axiosSecure = useAxiosSecure();
  return (
    <ModalContainer>
      <div>
        <form>
          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Name
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 bg-gray-100 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
              defaultValue={user.displayName}
              disabled
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 bg-gray-100 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
              defaultValue={user.email}
              disabled
            />
          </div>
        </form>

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
        </div>
      </div>
    </ModalContainer>
  );
};

export default DonationModal;
