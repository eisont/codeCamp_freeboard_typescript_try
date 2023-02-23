import {
  UseFormRegister,
  FieldValues,
  UseFormHandleSubmit,
  FormState,
} from "react-hook-form";

export interface IData {
  email: String;
  password: String;
  passwordCh: String;
  name: String;
}

export interface IPropsPre {
  errEmail: String;
  errPassword: string;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  formState: FormState<FieldValues>;
  onClickCreateUser: (data: IData) => Promise<void>;
  onClickLogin: () => void;
  isSignUp?: String;
}
