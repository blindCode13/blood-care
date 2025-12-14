import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Loading from '../components/Shared/Loading';

const Funding = () => {
    const {user} = useAuth();

    const { data: funds = [], isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/funds`);
        return result.data;
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  if (isLoading) return <Loading />

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/create-checkout-session`, {
            amount: e.target.amount.value, email: user.email
        });

        window.location = res.data.url;
    }

    return (
        <div className='space-y-10'>
            <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 w-fit text-center mx-auto">
                <h1 className='text-3xl'>Support the Mission of Saving Lives</h1>
                <p className='mt-6'>Your funding keeps our service running—helping us<br/>connect donors with those who need blood most.</p>

                <form className='flex items-center gap-3 mt-6' onSubmit={handleSubmit}>
                        <input
                            type="number"
                            name='amount'
                            min={0}
                            placeholder='Enter fund amount'
                            className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color)"
                        />
                        <button type='submit' className='primary-btn text-nowrap'>Give Fund</button>
                </form>
            </div>

            {
              funds.length === 0 && <h1 className='text-center'>No funds found.</h1>
            }

            {
              funds.length > 0 &&
              <div className=' xl:block space-y-3'>
                <div className="grid grid-cols-4 gap-x-5 text-center px-4 py-3 text-sm text-gray-500 uppercase w-full">
                    <span>Sl no</span>
                    <span>contributors</span>
                    <span>amount</span>
                    <span>date</span>
                </div>

                {funds.map((fund, index) => (
                <div
                  key={fund._id}
                  className="grid grid-cols-4 gap-x-5 items-center justify-items-center bg-white shadow-md rounded-xl px-4 py-5"
                >
                  <span className="font-medium">{index+1}</span>
                  <span className="font-medium">{fund.name}</span>
                  <span className="font-medium">{fund.amount} $</span>
                  <span className="font-medium">{new Date(fund.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
            }
        </div>
    );
};

export default Funding;