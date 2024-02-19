"use client"

import { userAgent } from 'next/server'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const Page = () => {
    
    const router =  useRouter()
    const [user, setUser] = useState(null)

function handleLogout() {
    //ilangin user dari local storage
    localStorage.removeItem("user")
    //hapus cookies
    Cookies.remove("token")
    //balik ke login page
    router.push("/")
}


    useEffect(() => {
        const userFromLs = localStorage.getItem("user")
        const parsedUserData = JSON.parse(userFromLs)
        setUser(parsedUserData)
    }, [])
    return (
        <div>
            <div> Dashboard</div>
            <div>Welcome Back, {user?.name}</div>
            <button onClick={handleLogout} >Log Out</button>
        </div>

    )
}

export default Page
