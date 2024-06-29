document.addEventListener("DOMContentLoaded", function () {
  const createRoomForm = document.getElementById("createRoomForm");

  createRoomForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("roomName").value;
    const password = document.getElementById("roomPassword").value;

    const response = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    if (response.ok) {
      alert("Room created successfully!");
    } else {
      alert("Failed to create room.");
    }
  });
});
