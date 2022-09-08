export const join = (req, res) => {
  res.render("users/join");
};

export const login = (req, res) => {
  res.render("users/login");
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
