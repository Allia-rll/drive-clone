"use server";

import { NewUser } from "@/types/models/user";
import { createUser } from "../../lib/userStatements";
import { encryptPass } from "../../utils/encryptPass";
import { RegisterInput } from "@/types/formsInterfaces/registerInput";

export const onRegister = async (data: RegisterInput) => {
  try {
    const { username, email, password } = data
    const hashedPass = await encryptPass(password);

    const user = {
      username,
      email,
      password: hashedPass,
    } as NewUser;

    const newUser = await createUser(user);

    if (!newUser[0]) {
      throw new Error("User already exists");
    }

    console.log("User created successfully");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
