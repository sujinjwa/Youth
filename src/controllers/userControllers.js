import User from "../model/User";

export const getJoin = (req, res) => {
  res.render("users/join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
  console.log(req.body);
  res.end();
};

export const login = (req, res) => {
  res.render("users/login", { pageTitle: "Login" });
};

export const seeUser = (req, res) => {
  console.log(req.params.id);
  res.render("users/seeUser");
};

export const editUser = (req, res) => {
  res.render("users/editUser");
};

export const deleteUser = (req, res) => {
  res.render("users/deleteUser");
};
