import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BUTTON_TYPES,
  BUTTON_VARIANT,
  TYPOGRAPHY_VARIANT,
} from "@/common/enums";
import Button from "../button";
import DragDropArea from "../dragDropArea";
import Typography from "../typography";
import InputBox from "../inputBox";
import Select from "../select";
import Card from "../card";
import styles from "./addForm.module.scss";
import { AddFormSchema } from "./validation";
import { REGEX, VALIDATION_ERRORS } from "@/common/constants";
import { IOptionType } from "@/common/types";


const defaultFormValues = {
  firstName: "",
  lastName: "",
  mobileNumber: "",
  experienceLevel: "",
  techStack: {} as IOptionType,
};

const AddForm = ({ handleSubmitButton, techStackOptions }: any) => {
  const hookForm = useForm({
    defaultValues: defaultFormValues,
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(AddFormSchema),
  });
  const {
    setValue,
    control,
    setError,
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { isValid, isSubmitting, errors },
  } = hookForm;

  const submitButtonDisableCondition =
    !isValid ||
    !hookForm.watch("experienceLevel") ||
    !hookForm.watch("techStack.label");

  const techStackValue = (value: IOptionType | IOptionType[]) => {
    if (!Array.isArray(value)) setValue("techStack", value);
    clearErrors(["techStack"]);
  };

  const onSubmit = (value: any) => {
    if (!value.techStack.label) {
      setError("techStack", { message: VALIDATION_ERRORS.REQUIRED_ERROR });
      return;
    }

    handleSubmitButton && handleSubmitButton(value);
  };
  console.log(errors);

  return (
    <div className={styles.addFormWrapper}>
      {/* TO BE ADDED LATER
      <Card title="From File">
        <React.Fragment>
          
          <DragDropArea customStyle={styles.uploadForm} /> 
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD}
            customStyle={styles.downloadLink}
          >
            Download sample file
          </Typography>
        </React.Fragment>
      </Card>
          */}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.addForm}>
        {/* <form onSubmit={onSubmit} className={styles.addForm}> */}
        <Typography variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD}>
          Manually
        </Typography>
        <div className={styles.field}>
          <Controller
            control={control}
            name="firstName"
            render={() => (
              <InputBox
                {...register("firstName")}
                label="First name"
                type="text"
                placeholder={"Enter first name"}
                error={errors.firstName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={() => (
              <InputBox
                {...register("lastName")}
                placeholder={"Enter Last name"}
                error={errors.lastName?.message}
                label="Last name"
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="mobileNumber"
          render={({}) => (
            <InputBox
              {...register("mobileNumber")}
              value={hookForm.watch("mobileNumber")}
              placeholder={"Enter 10 digit mobile number"}
              error={errors.mobileNumber?.message}
              label="Mobile number"
            />
          )}
        />

        <Controller
          control={control}
          name="experienceLevel"
          render={({}) => (
            <InputBox
              {...register("experienceLevel")}
              value={hookForm.watch("experienceLevel")}
              placeholder=""
              error={errors.experienceLevel?.message}
              label="Experience Level"
            />
          )}
        />

        <Controller
          control={control}
          name="techStack"
          render={({}) => (
            <Select
              {...register("techStack", {
                required: true,
              })}
              placeholder=""
              onSelect={techStackValue}
              options={techStackOptions}
              error={errors.techStack?.message}
              label="Tech stack"
            />
          )}
        />
        <Button
          variant={BUTTON_VARIANT.CONTAINED}
          onClick={handleSubmit(onSubmit)}
          disabled={submitButtonDisableCondition}
          type={BUTTON_TYPES.SUBMIT}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
export default AddForm;
