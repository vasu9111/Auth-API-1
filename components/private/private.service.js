import userMdl from "../../schemas/userMdl.js";

const pageData = async (req, res) => {
  try {
    const userId = req.user._id;

    const foundUserInDb = await userMdl.user.findOne({ _id: userId });

    return {
      name: foundUserInDb.name,
      email: foundUserInDb.email,
      registeredAt: foundUserInDb.registeredAt,
    };
  } catch (err) {
    const error = new Error(err.message);
    error.code = "SERVER_ERR";
    error.status = 500;
    throw error;
  }
};

export default { pageData };
