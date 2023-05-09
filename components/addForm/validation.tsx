import { REGEX, VALIDATION_ERRORS } from "@/common/constants";
import * as yup from "yup";

export const AddFormSchema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required(VALIDATION_ERRORS.REQUIRED_ERROR)
      .matches(REGEX.ONLY_ALPHABETS, VALIDATION_ERRORS.SPECIAL_CHARACTER_ERROR)
      .max(30, VALIDATION_ERRORS.MAX_CHARACTER_ERROR),
    lastName: yup
      .string()
      .required(VALIDATION_ERRORS.REQUIRED_ERROR)
      .matches(REGEX.ONLY_ALPHABETS, VALIDATION_ERRORS.SPECIAL_CHARACTER_ERROR)
      .max(30, VALIDATION_ERRORS.MAX_CHARACTER_ERROR),
    mobileNumber: yup
      .string()
      .max(10, VALIDATION_ERRORS.VALID_CONTACT_ERROR)
      .matches(REGEX.ONLY_NUMBERS, VALIDATION_ERRORS.NOT_NUMBER_ERROR)
      .min(10, VALIDATION_ERRORS.VALID_CONTACT_ERROR)
      .required(VALIDATION_ERRORS.REQUIRED_ERROR),
    experience: yup
      .object()
      .shape({
        id: yup.number(),
        label: yup.string(),
      })
      .required(VALIDATION_ERRORS.REQUIRED_ERROR),
    experienceLevel:yup
    .string()
    .matches(REGEX.ONLY_NUMBERS, VALIDATION_ERRORS.NOT_NUMBER_ERROR)
    .required(VALIDATION_ERRORS.REQUIRED_ERROR)
    ,
    techStack: yup
      .object()
      .shape({
        id: yup.number(),
        label: yup.string(),
      })
      .required(VALIDATION_ERRORS.REQUIRED_ERROR),
  })
  .required();
