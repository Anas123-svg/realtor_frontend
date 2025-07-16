import axios from "axios";

export const login = async (email: string, password: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
    {
      email,
      password,
    },
  );
  localStorage.setItem("token", data.token);
  return data;
};

export const logout = async () => {
  localStorage.removeItem("token");
  return null;
};

export const loginBack = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/by-token`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return { admin: data.admin, token };
};
