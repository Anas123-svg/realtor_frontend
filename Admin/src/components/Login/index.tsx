"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { login } from "@/hooks/auth";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { user, setToken, setUser } = useAuthStore();
  const { t } = useTranslation();

  if (user) {
    router.push("/");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");
    setIsSubmitting(true);
    try {
      const { admin, token, message } = await login(email, password);
      setUser(admin);
      setToken(token);
      setIsSubmitting(false);
      router.push("/");
      toast.success(message || "Logged in successfully");
    } catch (error: any) {
      setIsSubmitting(false);
      if (error.response?.status === 401) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error("Something went wrong, please try again");
      console.log(error);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center dark:bg-meta-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-boxdark">
        <h2 className="text-gray-700 text-center text-2xl font-semibold dark:text-white">
          {t("adminLogin")}
        </h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-gray-700 dark:text-gray-300 block text-sm font-medium"
            >
              {t("email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:border-strokedark dark:bg-meta-4 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-300 block text-sm font-medium"
            >
              {t("password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:border-strokedark dark:bg-meta-4 dark:text-white sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="hover:bg-primary-dark flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isSubmitting ? t("loggingIn") : t("login")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
