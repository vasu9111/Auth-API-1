import userMdl from "../../schemas/userMdl.js";

const userProfile = async (req, res) => {
  const userId = req.user;

  const foundUserInDb = await userMdl.user.findOne({ _id: userId });

  const userProfile = {
    name: foundUserInDb.name,
    email: foundUserInDb.email,
    registeredAt: foundUserInDb.registeredAt,
  };

  res.status(200).json(userProfile);
};

export default { userProfile };
