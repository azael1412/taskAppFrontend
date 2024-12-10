import { ErrorStrings } from "@/models";

export const convertArrayToString = (arrayString: string[]): string => {

  if (!Array.isArray(arrayString)) {
    throw new Error('El valor proporcionado no es un arreglo.');
  }

  if (arrayString.length === 0) {
    return '';
  }

  if (arrayString.length === 1) {
    return arrayString[0];
  }

  return arrayString.slice(0, -1).join(', ') + ' y ' + arrayString.slice(-1);
};



// export const convertRegistrationErrorToStrings = (error: RegistrationError): ErrorStrings => {
//     const errorStrings: ErrorStrings = {} as ErrorStrings;

//     Object.keys(error).forEach((key) => {
//       const messages = error[key as keyof RegistrationError];
//       if (messages && messages.length > 0) {
//         errorStrings[key as keyof RegistrationError] = messages.join(", ");
//       }
//     });

//     return errorStrings;
//   };


export const convertRegistrationErrorToStrings = <T extends Partial<Record<keyof T, string[]>>>(
  error: T
): ErrorStrings<T> => {
  const errorStrings: ErrorStrings<T> = {} as ErrorStrings<T>;

  Object.keys(error).forEach((key) => {
    const messages = error[key as keyof T];
    if (messages && messages.length > 0) {
      errorStrings[key as keyof T] = messages.join(", ");
    }
  });

  return errorStrings;
};