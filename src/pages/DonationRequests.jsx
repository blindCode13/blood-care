
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Shared/Loading";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

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
							<div className="grid grid-cols-9 gap-x-5 text-center px-4 py-3 text-sm text-gray-500 uppercase w-full">
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
											className={`grid grid-cols-9 gap-x-5 items-center justify-items-center bg-white shadow-md rounded-xl px-4 py-5 ${req.requesterEmail === user?.email ? 'border-l-8 border-amber-200' : ''}`}>
												<span className="font-medium">
												{
													(currentPage * 5) + index + 1
												}</span>
											<span className="font-medium text-center">
												{
													req.recipientName
												}</span>

											<span className="text-gray-700 text-center">
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

											<span className="px-3 w-fit py-1 rounded-full bg-(--primary-color)/10 text-(--primary-color) text-sm font-medium">
												{
													req.bloodGroup
												} </span>

											<span className="text-gray-700">
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
											bg-white
											border border-gray-200
											rounded-2xl
											p-5
											shadow-sm
											hover:shadow-md
											transition-all
											">
										<div className="flex justify-between items-start">
											<div className="space-y-0.5">
												<h4 className="text-lg font-semibold text-(--primary-color)">
													<span className="font-normal text-black">{(currentPage * 5) + index + 1}. Recipient:</span>
													{" "}
													{
														req.recipientName
													} </h4>

												<p className="text-xs mt-2 text-gray-500 line-clamp-1">
													Location: &nbsp; {
														req.recipientDistrict
													}, {
														req.recipientUpazila
													} </p>

												<p className="text-xs mt-2 text-gray-500 line-clamp-1">
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

										<p className="text-gray-500 text-xs mt-2">
											Donation scheduled for the selected date and time.
										</p>

										<div className="flex items-center gap-3 mt-3">

											<span className="
												inline-flex justify-center
												bg-(--primary-color)/10
												text-(--primary-color)
												text-xs font-semibold
												px-3 py-1 rounded-full
											">
												{
													req.bloodGroup
												} </span>

											<span className="text-xs text-gray-500">
												📅 {
													req.donationDate
												} </span>

											<span className="text-xs text-gray-500">
												⏰ {
													req.donationTime
												} </span>
										</div>

										<div className="flex mt-4 pt-3 border-t border-gray-200">
											<button className="primary-btn" onClick={() => navigate(`/donation-requests/${req._id}`)}>View</button>
										</div>
									</div>
								))
							} </div>
					</div>
				)
			}
				<div className="flex items-center justify-center gap-5 my-12 flex-wrap">
								{
									Array.from({ length: pages }).map((_, index) => (
        								<button key={index} className={`flex items-center justify-center size-12 bg-white rounded-md border-2 font-bold border-(--primary-color) cursor-pointer ${index === currentPage && 'active-page'}`} onClick={() => setCurrentPage(index)}>{index + 1}</button>
      								))
								}
							</div>
			
			 </div>
	);
};

export default DonationRequests;
