import user from "../../schemas/userMdl.js";

const userProfile = async (req, res) => {
  const userId = req.user;

  const findUserData = await user.findOne({ _id: userId });

  const userProfile = {
    name: findUserData.name,
    email: findUserData.email,
    registeredAt: findUserData.registeredAt,
  };

  res.status(200).json(userProfile);
};

export default { userProfile };
