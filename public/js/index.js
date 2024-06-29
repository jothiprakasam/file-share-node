document.addEventListener("DOMContentLoaded", function () {
  const createRoomForm = document.getElementById("createRoomForm");
  const joinRoomForm = document.getElementById("joinRoomForm");
  const roomDetails = document.getElementById("roomDetails");
  const roomNameDisplay = document.getElementById("roomNameDisplay");
  const uploadForm = document.getElementById("uploadForm");
  const filesList = document.getElementById("filesList");

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

  joinRoomForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("joinRoomName").value;
    const password = document.getElementById("joinRoomPassword").value;

    const response = await fetch("/api/rooms/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    if (response.ok) {
      const { room } = await response.json();
      roomNameDisplay.textContent = room.name;
      filesList.innerHTML = "";
      room.files.forEach((file) => {
        const fileItem = document.createElement("li");
        fileItem.innerHTML = `<a href="${file.path}" target="_blank">${file.name}</a>`;
        filesList.appendChild(fileItem);
      });
      roomDetails.style.display = "block";
      joinRoomForm.style.display = "none";
    } else {
      alert("Invalid password.");
    }
  });

  uploadForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const name = document.getElementById("joinRoomName").value; // Use room name

    const response = await fetch(`/api/rooms/${name}/upload`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const room = await response.json();
      const lastFile = room.files[room.files.length - 1];
      const fileItem = document.createElement("li");
      fileItem.innerHTML = `<a href="${lastFile.path}" target="_blank">${lastFile.name}</a>`;
      filesList.appendChild(fileItem);
    } else {
      alert("File upload failed.");
    }
  });
});
