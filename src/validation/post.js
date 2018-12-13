import Validator from "validator";
import { isEmpty } from "./isEmpty";

export default data => {
  const errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 }))
    errors.text = "Post must be between 10 and 300 characters";

  if (Validator.isEmpty(data.text)) errors.text = "Post is required";

  return { errors, isValid: isEmpty(errors) };
};
