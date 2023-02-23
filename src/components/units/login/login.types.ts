import {
  FieldValues,
  FormState,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";

export interface IData {
  email: String;
  password: String;
}

export interface IPropsPre {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  formState: FormState<FieldValues>;
  onClickHome: () => void;
  onClickSignup: () => void;
  onClickLogin: (data: IData) => Promise<void>;
}
