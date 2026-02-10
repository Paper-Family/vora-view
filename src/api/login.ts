import url from "@/url";

export type SignupRequest = {
  email: string;
  name: string;
  password: string;
};

export type SignupResponse = {
  message: string;
};

export async function signupApi(
  body: SignupRequest,
): Promise<SignupResponse> {
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
  }

  return res.json();
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
};

export async function loginApi(
  body: LoginRequest,
): Promise<LoginResponse> {
  const res = await fetch(`${url.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
    // credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? "Login failed");
  }

  return res.json();
}

export type LogoutResponse = {
  message: string;
};

export async function logoutApi(): Promise<LogoutResponse> {
  const res = await fetch(`${url.LOGOUT}`, {
    method: "GET",
    cache: "no-store",
    // credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? "Logout failed");
  }

  return res.json();
}