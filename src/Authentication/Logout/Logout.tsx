import React, { useEffect } from "react";
import { useContext } from "react";
import { UserInfoContext } from "../UserInfoContext";

export default function Logout() {
    const {setLoggedIn} = useContext(UserInfoContext)

    useEffect(() => {
        setLoggedIn(false)
    }, [])
    return (<></>)
}