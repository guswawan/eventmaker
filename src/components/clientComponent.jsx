"use client"

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";




const router = useRouter();
const [user, setUser] = useState(null);

function handleLogout() {
  //ilangin user dari local storage
  localStorage.removeItem("user");
  //hapus cookies
  Cookies.remove("token");
  //balik ke login page
  router.push("/");
}

//ngambil user dari local storage
useEffect(() => {
  const userFromLs = localStorage.getItem("user");
  //dibalikin ke parse, suapaya user yang tipe datanya string berubah ke object
  const parsedUserData = JSON.parse(userFromLs);
  setUser(parsedUserData);
}, []);