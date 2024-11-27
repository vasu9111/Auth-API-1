import user from "../../schemas/userMdl.js";

const homePage = async (req, res) => {
  res.status(200).json({ message: `This Is Home Page` });
};

export default { homePage };
