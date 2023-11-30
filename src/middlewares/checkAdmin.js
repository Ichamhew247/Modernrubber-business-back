exports.checkAdmin = (req, res, next) => {
  if (req.session.role === "admin") {
    next(); // User has admin role, proceed to the next middleware (productRoute)
  } else {
    res.status(403).json({ message: "You are not an admin" }); // User doesn't have admin role, send a forbidden response
  }
};
