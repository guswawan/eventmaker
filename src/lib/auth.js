"use client";

import Cookies from "js-cookie";
import toast from "react-hot-toast";

export async function requestLogin(email, password) {
  const res = await fetch("https://eventmakers-api.fly.dev/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
export async function login(email, password) {
  const { token, payload } = await requestLogin(email, password);
  localStorage.setItem("user", JSON.stringify(payload));
  Cookies.set("token", token);
}

export function logout() {
  toast.success("Logout success!");
  localStorage.removeItem("user");
  Cookies.remove("token");
}

export function session() {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const token = Cookies.get("token");
  return { user, token };
}
