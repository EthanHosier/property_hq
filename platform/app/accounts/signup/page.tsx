"use client";

import React, { useState } from "react";
import { auth } from "../../../services/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signup() {
    return await createUserWithEmailAndPassword(auth, email, password);
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
      <h1 style={{ fontWeight: "bold", fontSize: 40 }}>Sign up</h1>
      <form style={{ flexDirection: "column" }} onSubmit={signup}>
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
          style={{ backgroundColor: "green", borderRadius: 5 }}
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
