import { VALIDATION_ERRORS } from "@/common/constants";
import * as yup from "yup";

export const AddFormSchema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required(VALIDATION_ERRORS.REQUIRED_ERROR)
      .matches(/[A-Za-z]/, VALIDATION_ERRORS.SPECIAL_CHARACTER_ERROR)
      .max(30, VALIDATION_ERRORS.MAX_CHARACTER_ERROR),
    lastName: yup
      .string()
      .required(VALIDATION_ERRORS.REQUIRED_ERROR)
      .matches(/[A-Za-z]/, VALIDATION_ERRORS.SPECIAL_CHARACTER_ERROR)
      .max(30, VALIDATION_ERRORS.MAX_CHARACTER_ERROR),
    mobileNumber: yup
      .string()
      .max(10, VALIDATION_ERRORS.VALID_CONTACT_ERROR)
      .min(10, VALIDATION_ERRORS.VALID_CONTACT_ERROR)
      .required(VALIDATION_ERRORS.REQUIRED_ERROR),
    experience: yup
      .object()
      .shape({
        id: yup.number(),
        label: yup.string(),
      })
      .required(VALIDATION_ERRORS.REQUIRED_ERROR),
    techStack: yup
      .object()
      .shape({
        id: yup.number(),
        label: yup.string(),
      })
      .required(VALIDATION_ERRORS.REQUIRED_ERROR),
  })
  .required();
