import { FaTrashAlt } from "react-icons/fa";
import ModalContainer from './ModalContainer';
import { toast } from 'react-toastify';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DeleteConfirmation = ({setModalShow, currentDeleteReq, processingCount, setProcessingCount, email}) => {

	const axiosSecure = useAxiosSecure();

	return (
		<ModalContainer>
			<div className="text-center">
				<div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-(--primary-color)/10">
					<FaTrashAlt className="text-(--primary-color) text-2xl"/>
				</div>

				<h2 className="text-xl font-semibold text-gray-800 mb-2">
					Delete donation request
				</h2>
				<p className="text-gray-600 mb-6">
					Are you sure you want to delete this donation request?
				</p>

				<div className="flex justify-center gap-3">
					<button className="secondery-btn cursor-pointer"
						onClick={
							() => setModalShow(false)
					}>
						Cancel
					</button>
					<button className="primary-btn cursor-pointer" onClick={async() => {
                        try {
                            await axiosSecure.delete(`${import.meta.env.VITE_SERVER_API_URL}/donation-requests/delete/${currentDeleteReq}?email=${email}`);
                            setProcessingCount(processingCount + 1);
                            toast.success("Successfully deleted donation request");
                        }
                        catch (err) {toast.error(err.message);}
                        finally {setModalShow(false);}
                    }}>
						Delete
					</button>
				</div>
			</div>
		</ModalContainer>
	);
};

export default DeleteConfirmation;
