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

const AddForm = () => {
  const hookForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      experience: {} as IOptionType,
      techStack: {} as IOptionType,
    },
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
    !hookForm.watch("experience.id") ||
    !hookForm.watch("techStack.id");

  const firstNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (REGEX.ONLY_ALPHABETS.test(value) || value.length === 0) {
      setValue("firstName", `${value}`);
    }
  };

  const mobileNumberValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (REGEX.ONLY_NUMBERS.test(value) || value.length === 0) {
      setValue("mobileNumber", `${value}`);
    }
  };
  const experienceValue = (value: IOptionType | IOptionType[]) => {
    if (!Array.isArray(value)) setValue("experience", value);
    clearErrors(["experience"]);
  };

  const techStackValue = (value: IOptionType | IOptionType[]) => {
    if (!Array.isArray(value)) setValue("techStack", value);
    clearErrors(["techStack"]);
  };

  const lastNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (REGEX.ONLY_ALPHABETS.test(value) || value.length === 0) {
      setValue("lastName", `${value}`);
    }
  };
  const onSubmit = (value: any) => {
    if (!value.techStack.label) {
      setError("techStack", { message: VALIDATION_ERRORS.REQUIRED_ERROR });
      return;
    }
    console.log(value);
  };

  return (
    <div className={styles.addFormWrapper}>
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.addForm}>
        <Typography variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD}>
          Manually
        </Typography>
        <div className={styles.field}>
          <Controller
            control={control}
            name="firstName"
            render={({}) => (
              <InputBox
                {...register("firstName", {
                  required: true,
                  onChange: firstNameValue,
                })}
                value={hookForm.watch("firstName")}
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
            render={({}) => (
              <InputBox
                {...register("lastName", {
                  required: true,
                  onChange: lastNameValue,
                })}
                value={hookForm.watch("lastName")}
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
              {...register("mobileNumber", {
                required: true,
                onChange: mobileNumberValue,
              })}
              value={hookForm.watch("mobileNumber")}
              placeholder={"Enter 10 digit mobile number"}
              error={errors.mobileNumber?.message}
              label="Mobile number"
            />
          )}
        />

        <Controller
          control={control}
          name="experience"
          render={({}) => (
            <Select
              {...register("experience", {
                required: true,
                onChange: experienceValue,
              })}
              placeholder=""
              onSelect={experienceValue}
              options={[
                { id: 1, label: "0-2 Years" },
                { id: 2, label: "2-5 Years" },
                { id: 3, label: "10+ Years" },
              ]}
              error={errors.experience?.message}
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
                onChange: techStackValue,
              })}
              placeholder=""
              onSelect={techStackValue}
              options={[
                { id: 1, label: "Java" },
                { id: 2, label: "C" },
                { id: 3, label: "Javascript" },
              ]}
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
