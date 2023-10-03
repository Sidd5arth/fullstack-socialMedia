import { SupabaseClient } from "@supabase/supabase-js";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";
import AppContext from "../context/app-context";
import { useNavigate } from "react-router";
import { Circles } from "react-loader-spinner";

interface FormData {
  loginEmail: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword: string;
  registerUsername: string;
  supabase: SupabaseClient;
}
interface UserData {
  user: object;
  session: object;
}

const AuthPage: React.FC = () => {
  const { userData, setUserData } = useContext(AppContext) as {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  };
  const [isLoading, setIsLoading] = useState<boolean>();
  const userInfo = useCallback(async () => {
    if (
      Object.keys(userData.user).length === 0 ||
      Object.keys(userData.session).length === 0
    ) {
      navigate("/AuthPage", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [userData.user, userData.session]);

  useEffect(() => {
    userInfo();
  }, [userData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const supaUrl = "https://djstzjejdnfaizwrtinh.supabase.co";
  const supaKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc3R6amVqZG5mYWl6d3J0aW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwMDMzOTYsImV4cCI6MjAxMTU3OTM5Nn0.VkydOrueYpqOv1SNcs4XQzlQ9ausb6wh2KaQIGBZ2jk";
  const supabase = createClient(supaUrl, supaKey);

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  //this is a fuctionality which allows user to login without credential later
  // they only need to sign-in one time

  // const storeSessionToLocalStorage = (session: any) => {
  //   localStorage.setItem("supabaseSession", JSON.stringify(session));
  // };

  // const getSessionFromLocalStorage = () => {
  //   const storedSession = localStorage.getItem("supabaseSession");
  //   if (storedSession) {
  //     return JSON.parse(storedSession);
  //   }
  //   return null;
  // };

  // useEffect(() => {
  //   const storedSession = getSessionFromLocalStorage();
  //   if (storedSession) {
  //     setUserData({ user: storedSession.user, session: storedSession.session });
  //   }
  // }, [setUserData]);

  const onSubmit = async (val: FormData) => {
    try {
      setIsLoading(true);
      if (isLogin) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: val.loginEmail,
            password: val.loginPassword,
          });
          if (data.user) {
            setUserData({
              user: data.user,
              session: data.session,
            });
            // storeSessionToLocalStorage(data.session);
            toast.success("Logged in!");
            navigate("/", { replace: true });
          } else {
            toast.error("Invalid details Please Register or try again");
            setIsLogin(false);
          }
        } catch (err) {
          toast.success("somthing went wrong!");
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: val.registerEmail,
          password: val.registerPassword,
          options: {
            data: {
              first_name: val.registerUsername,
            },
          },
        });
        if (!error) {
          const { data: createdUser, error: dbError } = await supabase
            .from("users")
            .insert([
              {
                user_id: data.user?.id,
                username: val.registerUsername,
                email: data.user?.email,
              },
            ]);
          if (dbError) {
            toast.error(dbError.message);
          } else {
            toast.success("Registered!");
            setIsLogin(true);
          }
        } else toast.error(error.message);
      }
    } catch (err) {
      toast.success("invalid credentials");
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-md my-40 mx-auto p-12 transition-all ms-0.3 ease-in-out border-2 rounded-lg">
      <Toaster />
      <div className="flex justify-center mb-4 w-full transition-all ms-0.3 ease-in-out">
        <button
          className={`w-full py-2 px-4 rounded-tl-lg transition-all ms-0.3 ease-in-out ${
            isLogin
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`w-full py-2 px-4 rounded-tr-lg transition-all ms-0.3 ease-in-out ${
            !isLogin
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg p-2"
            {...register(isLogin ? "loginEmail" : "registerEmail", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors[isLogin ? "loginEmail" : "registerEmail"] && (
            <p className="text-red-500">Email is required</p>
          )}
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg p-2"
            {...register(isLogin ? "loginPassword" : "registerPassword", {
              required: true,
              minLength: 6,
            })}
          />
          {errors[isLogin ? "loginPassword" : "registerPassword"] && (
            <p className="text-red-500">
              Password must be at least 6 characters long
            </p>
          )}

          {!isLogin && (
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="w-full border border-gray-300 rounded-lg p-2"
              {...register("registerUsername", { required: true })}
            />
          )}

          {isLoading ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <Circles color="white" width={"24px"} height={"24px"} />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
