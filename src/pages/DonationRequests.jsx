
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Shared/Loading";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const DonationRequests = () => {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(0);
	const {user} = useAuth();
	const {
		data: requests = {},
		isLoading
	} = useQuery({
		queryKey: ['donationStatus', currentPage],
		queryFn: async () => {
			const result = await axios(`${import.meta.env.VITE_SERVER_API_URL}/donation-requests/public?limit=5&skip=${currentPage*5}`);
			return result.data;
		}
	});

	if (isLoading) return <Loading />
	
	const pages = Math.ceil(requests.count / 5);

	return (
		<div className="space-y-10">
			{
				requests?.result.length === 0 && <h1>Nothing to show.</h1>
			}

			{
				requests.result.length > 0 && (
					<div className="space-y-4">
						<div className="hidden xl:block">
							<div className="grid grid-cols-9 gap-x-5 text-center px-4 py-3 text-sm text-primary-text/80 uppercase w-full">
								<span>sl no</span>
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
									requests?.result.map((req, index) => (
										<div key={
											req._id
										}
											className={`grid grid-cols-9 gap-x-5 items-center justify-items-center bg-primary-bg shadow-md rounded-xl px-4 py-5 ${req.requesterEmail === user?.email ? 'border-l-8 border-amber-200' : ''}`}>
												<span className="font-medium">
												{
													(currentPage * 5) + index + 1
												}</span>
											<span className="font-medium text-center">
												{
													req.recipientName
												}</span>

											<span className="text-center">
												{
													req.recipientDistrict
												},<br /> {
													req.recipientUpazila
												} </span>

											<span className="text-center">{
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

											<button className="primary-btn" onClick={() => navigate(`/donation-requests/${req._id}`)}>View</button>
										</div>
									))
								} </div>
						</div>

						<div className="xl:hidden space-y-5">
							{
								requests?.result.map((req, index) => (
									<div key={
										req._id
									}
										className="
											bg-primary-bg
											border border-gray-200/30
											rounded-2xl
											p-5
											shadow-sm
											hover:shadow-md
											transition-all
											">
										<div className="flex justify-between items-start">
											<div className="space-y-0.5">
												<h4 className="text-lg font-semibold text-primary">
													<span className="font-normal text-primary-text">{(currentPage * 5) + index + 1}. Recipient:</span>
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

										<div className="flex mt-4 pt-3 border-t border-gray-200/60">
											<button className="primary-btn" onClick={() => navigate(`/donation-requests/${req._id}`)}>View</button>
										</div>
									</div>
								))
							} </div>
					</div>
				)
			}
				<div className="flex items-center justify-center gap-5 my-12 flex-wrap">
					<button className="flex items-center justify-center text-3xl text-primary bg-primary-bg rounded-full size-16 cursor-pointer hover:scale-110 transition border border-primary disabled:text-primary/40" disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}><FaArrowLeft /></button>
								{
									Array.from({ length: pages }).map((_, index) => (
        								<button key={index} className={`flex items-center justify-center size-12 bg-primary-bg rounded-md border-2 font-bold border-primary cursor-pointer ${index === currentPage && 'active-page'}`} onClick={() => setCurrentPage(index)}>{index + 1}</button>
      								))
								}
								<button className="flex items-center justify-center text-3xl text-primary bg-primary-bg rounded-full size-16 cursor-pointer hover:scale-110 transition border border-primary disabled:text-primary/40" disabled={currentPage === pages - 1} onClick={() => setCurrentPage(currentPage + 1)}><FaArrowRight /></button>
					</div>
			
			 </div>
	);
};

export default DonationRequests;
