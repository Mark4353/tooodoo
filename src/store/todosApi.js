const API_URL = "https://69b691d2583f543fbd9e0575.mockapi.io/taskList";

export async function fetchTodosApi() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Помилка завантаження");
  return await res.json();
}

export async function addTodoApi(text) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, completed: false }),
  });
  if (!res.ok) throw new Error("Помилка додавання");
  return await res.json();
}

export async function toggleTodoApi(id, completed) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed }),
  });
  if (!res.ok) throw new Error("Помилка оновлення");
  return await res.json();
}

export async function deleteTodoApi(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Помилка видалення");
  return id;
}
