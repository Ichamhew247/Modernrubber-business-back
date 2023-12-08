exports.checkAdmin = (req, res, next) => {
  if (req.session.role === "admin") {
    next();
  } else if (req.session.role === "user") {
    res.status(403).json({ message: "You are not an admin" });
  } else {
    next();
  }
};
