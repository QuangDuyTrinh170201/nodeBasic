import pool from "../configs/connectDB";
import multer from "multer";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users ");
  return res.render("index.ejs", { dataUser: rows });
};

let getDetailPage = async (req, res) => {
  let userId = req.params.userId;
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);

  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  console.log(">>check req: ", req.body);
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO users(firstName, lastName, email, address) values (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
  return res.redirect("/");
};

let editUser = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("Select * from users where id = ?", [id]);
  return res.render("update.ejs", { dataUser: user[0] });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    `update users set firstName = ?, lastName = ?, email = ?, address = ? where id =?`,
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

const upload = multer().single("profile_pic");

let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

let handleUploadFile = async (req, res) => {
  // let upload = multer({
  //   storage: storage,
  //   fileFilter: imageFilter,
  // }).single("profile_pic");

  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select the image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    res.send(
      `you have uploaded this image: <hr /><img src="/image/${req.file.filename}" width = "500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  editUser,
  updateUser,
  getUploadFilePage,
  handleUploadFile,
};
