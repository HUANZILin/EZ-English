import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const fetchMember = async () => {
  const token = sessionStorage.getItem("memberToken");
  const response = await fetch("https://jybluega.com/ez-backend/home", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error("取得會員資料時發生錯誤");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { data } = await response.json();

  return data.slice(15);
};

export async function updatePassword({ id, password }) {
  const response = await fetch(``, {
    method: "PUT",
    body: JSON.stringify({ password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("更新密碼時發生錯誤");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function deleteAccount({ id }) {
  const response = await fetch(``, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("刪除帳號時發生錯誤");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
