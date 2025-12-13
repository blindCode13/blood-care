import Spinner from '../../assets/spinner.gif';

const Loading = () => {
    return (
        <div className='flex items-center justify-center w-full'>
            <img src={Spinner} className='size-[140px]'/>
        </div>
    );
};

export default Loading;