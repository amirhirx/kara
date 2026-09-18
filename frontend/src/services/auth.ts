// TODO: read api url from env

import type { LoginPayload, SignUpPayload } from "@/types";

export const signUp = async (payload: SignUpPayload) => {
  try {
    const endpoint = `http://localhost:3000/api/auth/signup`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (payload: LoginPayload) => {
  try {
    const endpoint = `http://localhost:3000/api/auth/login`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserDetails = async () => {
  try {
    const endpoint = "http://localhost:3000/api/auth/me";
    const res = await fetch(endpoint, { credentials: "include" });
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
