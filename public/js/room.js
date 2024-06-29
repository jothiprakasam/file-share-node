document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("id");
  const roomNameElement = document.getElementById("roomName");
  const uploadForm = document.getElementById("uploadForm");
  const filesList = document.getElementById("filesList");

  async function fetchRoom() {
    const response = await fetch(`/api/rooms/${roomId}`);
    const room = await response.json();
    roomNameElement.textContent = room.name;
    room.files.forEach((file) => {
      const fileItem = document.createElement("li");
      fileItem.innerHTML = `<a href="${file.path}" target="_blank">${file.name}</a>`;
      filesList.appendChild(fileItem);
    });
  }

  uploadForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const response = await fetch(`/api/rooms/${roomId}/upload`, {
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

  fetchRoom();
});
