const Room = require("../models/Room");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

// Ensure uploads directory exists
const fs = require("fs");
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.createRoom = async (req, res) => {
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const room = new Room({ name, password: hashedPassword });
  await room.save();
  res.status(201).send(room);
};

exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.send(rooms);
};

exports.getRoom = async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.send(room);
};

exports.uploadFile = [
  upload.single("file"),
  async (req, res) => {
    const { name } = req.params; // Use room name as parameter
    const room = await Room.findOne({ name });
    if (!room) {
      return res.status(404).send({ message: "Room not found" });
    }
    room.files.push({
      name: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
    });
    await room.save();
    res.status(200).send(room);
  },
];

exports.verifyPassword = async (req, res) => {
  const { name, password } = req.body;
  const room = await Room.findOne({ name });
  if (!room) {
    return res.status(404).send({ message: "Room not found" });
  }
  const isMatch = await bcrypt.compare(password, room.password);
  if (isMatch) {
    res.status(200).send({ message: "Password verified", room });
  } else {
    res.status(401).send({ message: "Invalid password" });
  }
};
