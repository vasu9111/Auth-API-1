import registerService from "./registerService.js";

const registerUser = async (req, res, next) => {
  try {
    const newUser = await registerService.registerUser(req, res, next);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export default { registerUser };
