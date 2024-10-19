"use client";
import React, { useState } from "react";
import { auth } from "../../../services/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoChevronBackOutline } from "react-icons/io5";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();

  async function login() {
    await signInWithEmailAndPassword(auth, email, password).then(() => {});
    console.log("logged in");
    useRouter().push("/");
  }

  return (
    <div
      style={{
        height: "100%",
        maxWidth: "400px",
        margin: "50px auto",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Link href="/">
        <IoChevronBackOutline
          style={{
            color: "gray",
            fontSize: 48,
            position: "absolute",
            top: 10,
            left: 10,
          }}
        />
      </Link>
      <h1 style={{ fontWeight: "bold", fontSize: 40 }}>Login</h1>
      <form style={{ flexDirection: "column" }} onSubmit={login}>
        <div
          style={{
            borderColor: "black",
            borderWidth: 0.5,
            marginBottom: 20,
            borderRadius: 5,
          }}
        >
          <input
            style={{
              width: "100%",
              paddingLeft: 10,
              paddingTop: 5,
              paddingBottom: 5,
            }}
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div
          style={{
            borderColor: "black",
            borderWidth: 0.5,
            marginBottom: 30,
            borderRadius: 5,
          }}
        >
          <input
            style={{
              width: "100%",
              paddingLeft: 10,
              paddingTop: 5,
              paddingBottom: 5,
            }}
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          style={{
            backgroundColor: "#588157",
            borderRadius: 5,
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 50,
            paddingRight: 50,
            borderWidth: 0.5,
            color: "white",
            fontWeight: "600",
          }}
          type="submit"
        >
          Login
        </button>
        <div style={{ marginTop: 15 }}>
          <span>
            <text> Don't have an account? </text>
            <Link
              href={"/accounts/signup"}
              style={{
                textDecoration: "underline",
                color: "black",
                fontWeight: "600",
              }}
            >
              Signup
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
