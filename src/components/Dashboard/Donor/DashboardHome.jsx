import DashboardNav from "../Shared/DashboardNav";
import {
	FiEdit2,
	FiTrash2,
	FiEye,
	FiCheck,
	FiX
} from "react-icons/fi";
import {Link, useLoaderData} from "react-router";
import useAuth from "../../../hooks/useAuth";

const DashboardHome = () => {
	const requests = useLoaderData() || [];
	const {user} = useAuth();

	const recent = requests.slice(0, 3);

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
		<div className="space-y-10">
			<DashboardNav title="Dashboard"/>

			<div>
				<h2 className="text-3xl font-semibold">
					Welcome,{" "}
					<span className="text-(--primary-color)">
						{
						user ?. displayName || user ?. name
					} </span>
				</h2>
				<p className="text-gray-600 mt-1">
					Manage your donation activities and requests here.
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
						<div className="grid grid-cols-8 gap-x-5 text-center px-4 py-3 text-sm text-gray-500 uppercase">
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
									className="grid grid-cols-8 gap-x-5 items-center justify-items-center bg-white shadow-md rounded-xl px-4 py-5">
									<span className="font-medium">
										{
										req.recipientName
									}</span>

									<span className="text-gray-700">
										{
										req.recipientDistrict
									},<br/> {
										req.recipientUpazila
									} </span>

									<span>{
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
									}<br/> {
										req.donorEmail ? req.donorEmail : "..."
									} </span>

									<span className={
										`px-3 py-1 rounded-full w-fit text-sm ${
											statusStyle(req.donationStatus)
										}`
									}>
										{
										req.donationStatus
									} </span>

									<div className="flex items-center gap-3">
										<Link to={
												`/dashboard/edit-request/${
													req._id
												}`
											}
											className="text-blue-600 hover:text-blue-800">
											<FiEdit2 size={20}/>
										</Link>

										<button className="text-red-600 hover:text-red-800">
											<FiTrash2 size={20}/>
										</button>

										<Link to={
												`/dashboard/request/${
													req._id
												}`
											}
											className="text-gray-700 hover:text-black">
											<FiEye size={22}/>
										</Link>

										{
										req.status === "inprogress" && (
											<>
												<button className="text-green-600 hover:text-green-800">
													<FiCheck size={22}/>
												</button>
												<button className="text-red-600 hover:text-red-800">
													<FiX size={22}/>
												</button>
											</>
										)
									} </div>
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
											<span className="font-normal text-black">Recipient:</span>
											{" "}
											{
											req.recipientName
										} </h4>

										<p className="text-xs mt-2 text-gray-500 line-clamp-1">
                      Location: &nbsp;
											{
											req.recipientDistrict
										}, {
											req.recipientUpazila
										} </p>

                    <p className="text-xs mt-2 text-gray-500 line-clamp-1">
                      Donor info: &nbsp;
											{
											req.donorName ? req.donorName : "..."
										} , {
											req.donorEmail ? req.donorEmail : "..."
										} </p>
									</div>

									<span className={
										`
            text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap
            ${
											statusStyle(req.donationStatus)
										}
          `
									}>
										{
										req.donationStatus
									} </span>
								</div>

								<p className="text-gray-500 text-xs mt-2">
									Donation scheduled for the selected date and time.
								</p>

								<div className="flex items-center gap-3 mt-3">

									<span className="
											          inline-flex items-center justify-center
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

								<div className="
										        flex items-center justify-between
										        mt-4 pt-3 border-t border-gray-200
										      ">

									<div className="flex items-center gap-4 text-gray-600">
                    <Link to={
												`/dashboard/edit-request/${
													req._id
												}`
											}
											className="text-blue-600 hover:text-blue-800">
											<FiEdit2 size={18}/>
										</Link>

										<button className="text-red-600 hover:text-red-700">
											<FiTrash2 size={18}/>
										</button>

                    <Link to={
												`/dashboard/request/${
													req._id
												}`
											}
											className="hover:text-black">
											<FiEye size={18}/>
										</Link>

										{
										req.donationStatus === "inprogress" && (
											<>
												<button className="text-green-600 hover:text-green-700">
													<FiCheck size={18}/>
												</button>
												<button className="text-red-600 hover:text-red-700">
													<FiX size={18}/>
												</button>
											</>
										)
									} </div>
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
	);
};

export default DashboardHome;
