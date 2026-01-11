import DashboardNav from "../Shared/DashboardNav";
import {
	FiEdit2,
	FiTrash2,
	FiEye,
} from "react-icons/fi";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import { useState } from "react";
import DeleteConfirmation from "../../Modals/DeleteConfirmation";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DonorHome = () => {
	const { user } = useAuth();
	const [modalShow, setModalShow] = useState(false);
	const axiosSecure = useAxiosSecure();
	const [processingCount, setProcessingCount] = useState(0);
	const [currentDeleteReq, setCurrentDeleteReq] = useState("");
	const {
		data: requests = {},
		isLoading
	} = useQuery({
		queryKey: ['requesterEmail', processingCount],
		queryFn: async () => {
			const result = await axiosSecure(`${import.meta.env.VITE_SERVER_API_URL
				}/donation-requests?email=${user.email
				}&statusFilter=pending`);
			return result.data;
		}
	});

	if (isLoading) return <Loading />

	const recent = requests?.result.slice(0, 3);

	return (
		<>
			{
				modalShow && <DeleteConfirmation setModalShow={setModalShow} currentDeleteReq={currentDeleteReq} setProcessingCount={setProcessingCount} processingCount={processingCount} email={user.email}/>
			}
		<div className="space-y-10">
			<DashboardNav title="Overview" />

			<div>
				<h2 className="text-3xl font-semibold">
					Welcome,{" "}
					<span className="text-primary">
						{
							user?.displayName || user?.name
						} </span>
				</h2>
				<p className="text-primary-text/60 mt-1">
					Get a overview of your donation activities and requests here.
				</p>
			</div>

			{
				recent.length === 0 && <h1>Nothing to show.</h1>
			}

			{
				recent.length > 0 && (
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">
							Your Recent Donation Requests
						</h3>

						<div className="hidden xl:block">
							<div className="grid grid-cols-8 gap-x-5 text-center px-4 py-3 text-sm text-primary-text/80 uppercase">
								<span>Recipient</span>
								<span>Location</span>
								<span>Date</span>
								<span>Time</span>
								<span>Blood</span>
								<span>Donor info</span>
								<span>Status</span>
								<span>Actions</span>
							</div>

							<div className="space-y-4">
								{
									recent.map((req) => (
										<div key={
											req._id
										}
											className="grid grid-cols-8 gap-x-5 items-center justify-items-center bg-primary-bg shadow-md rounded-xl px-4 py-5">
											<span className="font-medium">
												{
													req.recipientName
												}</span>

											<span>
												{
													req.recipientDistrict
												},<br /> {
													req.recipientUpazila
												} </span>

											<span>{
												req.donationDate
											}</span>
											<span>{
												req.donationTime
											}</span>

											<span className="px-3 w-fit py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
												{
													req.bloodGroup
												} </span>

											<span>
												{
													req.donorName ? req.donorName : "..."
												}<br /> {
													req.donorEmail ? req.donorEmail : "..."
												} </span>

											<span className="px-3 py-1 rounded-full w-fit text-sm bg-yellow-100 text-yellow-700">
												{
													req.donationStatus
												} </span>

											<div className="flex items-center gap-3">
												<Link to={
													`/donation-requests/edit/${req._id
													}`
												}
													className="text-blue-600 hover:text-blue-800">
													<FiEdit2 size={20} />
												</Link>

												<button className="text-red-600 hover:text-red-800 cursor-pointer" onClick={() => {
													setModalShow(true);
													setCurrentDeleteReq(req._id);
												}}>
													<FiTrash2 size={20} />
												</button>

												<Link to={
													`/donation-requests/${req._id
													}`
												}
													className="text-primary-text hover:text-primary-text/60">
													<FiEye size={22} />
												</Link>

										</div>
										</div>
									))
								} </div>
						</div>

						<div className="xl:hidden space-y-5">
							{
								recent.map((req) => (
									<div key={
										req._id
									}
										className="
											bg-primary-bg
											rounded-2xl
											p-5
											shadow-sm
											hover:shadow-md
											transition-all
											">
										<div className="flex justify-between items-start">
											<div className="space-y-0.5">
												<h4 className="text-lg font-semibold text-primary">
													<span className="font-normal text-primary-text">Recipient:</span>
													{" "}
													{
														req.recipientName
													} </h4>

												<p className="text-xs mt-2 text-primary-text/80 line-clamp-1">
													Location: &nbsp; {
														req.recipientDistrict
													}, {
														req.recipientUpazila
													} </p>

												<p className="text-xs mt-2 text-primary-text/80 line-clamp-1">
													Donor info: &nbsp; {
														req.donorName ? req.donorName : "..."
													}
													, {
														req.donorEmail ? req.donorEmail : "..."
													} </p>
											</div>

											<span className="px-3 py-1 rounded-full w-fit text-sm bg-yellow-100 text-yellow-700">
												{
													req.donationStatus
												} </span>
										</div>

										<p className="text-primary-text/80 text-xs mt-2">
											Donation scheduled for the selected date and time.
										</p>

										<div className="flex items-center gap-3 mt-3">

											<span className="
												inline-flex justify-center
												bg-primary/10
												text-primary
												text-xs font-semibold
												px-3 py-1 rounded-full
											">
												{
													req.bloodGroup
												} </span>

											<span className="text-xs text-primary-text/80">
												📅 {
													req.donationDate
												} </span>

											<span className="text-xs text-primary-text/80">
												⏰ {
													req.donationTime
												} </span>
										</div>

										<div className="
																				        flex items-center justify-between
																				        mt-4 pt-3 border-t border-gray-400/50
																				      ">

											<div className="flex items-center gap-4 text-gray-600">
												<Link to={
													`/donation-requests/edit/${req._id
													}`
												}
													className="text-blue-600 hover:text-blue-800">
													<FiEdit2 size={18} />
												</Link>

												<button className="text-red-600 hover:text-red-700 cursor-pointer" onClick={() => {
													setModalShow(true);
													setCurrentDeleteReq(req._id);
												}}>
													<FiTrash2 size={18} />
												</button>

												<Link to={
													`/donation-requests/${req._id
													}`
												}
													className="text-primary-text">
													<FiEye size={18} />
												</Link>
												</div>
										</div>
									</div>
								))
							} </div>

						<div className="text-center pt-3">
							<Link to="/dashboard/my-donation-requests" className="primary-btn px-6 py-3 inline-block">
								View My All Requests
							</Link>
						</div>
					</div>
				)
			} </div>
			</>
	);
};

export default DonorHome;
