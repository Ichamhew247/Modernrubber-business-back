exports.checkAdmin = (req, res, next) => {
  if (req.session.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "You are not an admin" });
  }
};
