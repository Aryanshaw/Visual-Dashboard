import DashboardMenuData from "../models/MenuData.js";

export const getAllMenuData = async (req, res) => {
  try {
    const menuItems = await DashboardMenuData.find();
    res.status(200).json(menuItems);
  } catch (err) {
    // res.sendStatus(500)
    res.status(500).json({ message: e.message });
    console.log("getmenudata");
  }
};
