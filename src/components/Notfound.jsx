import { TbError404 } from "react-icons/tb";
import { Link } from "react-router";

const NotFound = () => {

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-lg text-center border border-gray-100">
        
        <TbError404 className="w-20 h-20 text-(--primary-color) mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Page not found.
        </h1>

        <p className="text-gray-600 mb-8">
          The page you’re trying to access doesn’t exist or may have been moved.
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

export default NotFound;
