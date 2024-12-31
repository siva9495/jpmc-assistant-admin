import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ref, set, get, child } from "firebase/database"; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { app, db } from "../Firebase";

const AdminSigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth(app); // Initialize Firebase Auth using app
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // Check if user exists in the Realtime Database
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `JPMCReceptionistAdmin/${user.uid}`));

      if (!snapshot.exists()) {
        // Save new user to the Realtime Database
        await set(ref(db, `JPMCReceptionistAdmin/${user.uid}`), {
          email: user.email,
        });
        toast.success("New user registered!");
      } else {
        toast.success("Welcome back!");
      }

      // Navigate to Admin Dashboard
      navigate("/AdminDashboardPage");
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gradient-to-t from-blue-950 to-blue/5 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="container flex items-center justify-between px-6 py-2 mx-auto">
          {/* Logo on the Left */}
          <div className="flex items-center">
            <img
              className="h-12 filter invert brightness-0"
              src={`${process.env.PUBLIC_URL}/jpmc.png`}
              alt="JPMC Logo"
            />
          </div>
          {/* Title in the Center */}
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-white">
            Assistant Sign In
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center">
        {/* Left Section */}
        <div
          className="hidden lg:flex bg-cover lg:w-2/3 h-5/6 rounded-s-3xl ml-4"
          style={{
            backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0) 100%),
            url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Login as an assistant
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Please login with your credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="flex items-center w-full max-w-md px-6 lg:w-2/6 h-5/6 rounded-e-3xl"
          style={{
            backgroundImage:
              "linear-gradient(to left, rgba(59, 130, 246, 0.5), rgba(0, 0, 0, 0))",
          }}
        >
          <div className="flex-1 px-6">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-16 filter invert brightness-0"
                  src={`${process.env.PUBLIC_URL}/jpmc.png`}
                  alt="JPMC Logo"
                />
              </div>
              <p className="mt-3 font-medium text-lg text-white">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSignIn}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-white">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="w-1/2 px-4 py-2 tracking-wide font-bold text-white bg-black rounded-lg hover:bg-slate-900"
                  >
                    {loading ? "Loading..." : "Sign in"}
                  </button>
                </div>
              </form>
              <p className="mt-6 text-sm text-center text-gray-400">
                <a
                  href="#"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSigninPage;
