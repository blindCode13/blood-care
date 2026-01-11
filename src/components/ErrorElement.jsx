import { MdError } from "react-icons/md";
import { Link } from "react-router";

const ErrorElement = () => {

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-primary-bg rounded-3xl shadow-lg p-10 max-w-lg text-center">
        
        <MdError className="w-20 h-20 text-primary mx-auto mb-4" />

        <h1 className="text-3xl font-bold mb-2">
          Something went wrong.
        </h1>

        <p className="text-primary-text/60 mb-8">
          An unexpected error occurred. Refresh the page or come back later.
        </p>

        <Link
          to="/"
          className="primary-btn inline-block px-8 py-3 text-white rounded-xl"
        >
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default ErrorElement;
