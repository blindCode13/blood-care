import { FaSignOutAlt } from 'react-icons/fa';
import ModalContainer from './ModalContainer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const LogoutConfirmation = ({setModalShow, logOut}) => {
    const navigate = useNavigate();
	return (
		<ModalContainer>
			<div className="text-center">
				<div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-(--primary-color)/10">
					<FaSignOutAlt className="text-(--primary-color) text-2xl"/>
				</div>

				<h2 className="text-xl font-semibold text-gray-800 mb-2">
					Log Out
				</h2>
				<p className="text-gray-600 mb-6">
					Are you sure you want to Log out of your account?
				</p>

				<div className="flex justify-center gap-3">
					<button className="secondery-btn cursor-pointer"
						onClick={
							() => setModalShow(false)
					}>
						Cancel
					</button>
					<button className="primary-btn cursor-pointer"
						onClick={
							() => {
								logOut().then(() => {
									toast.success("Successfully logged out.");
								}).catch(err => toast.error(err.message)).finally(() => navigate("/"))
							}
					}>
						Log Out
					</button>
				</div>
			</div>
		</ModalContainer>
	);
};

export default LogoutConfirmation;
