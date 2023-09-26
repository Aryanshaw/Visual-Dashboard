import User from "../models/User.js";

export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (e) {
    res.status(500).json({ message: e.message });
    console.log(e, "register");
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();

    if (!user) return res.status(500).json("Error: User not found");

    if (user.password !== password)
      return res.status(500).json("Error: Incorrect password");

    const { password: _, ...otherDetails } = user.toObject();
    res.status(200).json({ ...otherDetails });
  } catch (e) {
    res.status(500).json({ message: e.message });
    console.log(e, "login");
  }
};

export const logout = async (req, res) => {
  // localStorage.removeItem("loggedin");
  return await res.status(200).json({ message: "Logout successful" });
};
