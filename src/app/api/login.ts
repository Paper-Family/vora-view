import url from "@/url";

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};
export type SignupResponse = {
  message: string;
};
export type LogoutResponse = {
  message: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = {
  message: string;
};

export async function postSignup(body: SignupRequest): Promise<SignupResponse> {
  const res = await fetch(`${url.SIGNUP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "Signup failed");
  } else {
    console.log("Signup successful:", console.log(res.clone().json()));
  }

  return res.json();
}
export async function postLogin(body: LoginRequest): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message ?? "Login failed");
  return data;
}

export async function getLogout(): Promise<LogoutResponse> {
  const res = await fetch("/api/auth/logout", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message ?? "Logout failed");
  return data;
}
