"use client";

import React from "react";

export const Login = () => {
async function handleSubmitLogin(event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

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

  const {payload, token} = await res.json();
  localStorage.setItem("user", JSON.stringify(payload))
}

  return (
    <div>
      <form onSubmit={handleSubmitLogin} action="">
        <input name="email" type="text" />
        <input name="password" type="text" />
        <button>Login</button>
      </form>
    </div>
  );
};

