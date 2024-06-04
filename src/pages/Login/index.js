import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthEmailContext } from "../../contexts/authEmail";

const SignUpForm = () => {
  const { signInEmail, user, errorLogin } = useContext(AuthEmailContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInEmail(email, password);
    setError(errorLogin);
  };

  useEffect(() => {
    setError(errorLogin);
  }, [errorLogin]);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-sm m-2"
          role="alert"
        >
          <span className="block sm:inline">
            Email e/ou senha estão errados.
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={(e) => setError(false)}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-4 bg-gray-200 rounded-lg"
      >
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
