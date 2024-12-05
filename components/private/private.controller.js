import privateService from "./private.service.js";

const privateRoute = async (req, res, next) => {
  try {
    const pageData = await privateService.pageData(req, res);
    res.status(200).json(pageData);
  } catch (error) {
    next(error);
  }
};

export default { privateRoute };
