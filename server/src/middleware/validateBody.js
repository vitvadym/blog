import ApiError from "../utils/apiError.js";

export const validateBody = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }
    next();
  };
};
