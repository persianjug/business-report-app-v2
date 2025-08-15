// import { UseFormRegisterReturn } from "react-hook-form";
// import ErrorMessage from "./ErrorMessage";
// import Label from "./Label";

// interface InputProps {
//   label: string;
//   id: string;
//   type?: "text" | "number" | "date" | "email" | "password";
//   isRequired?: boolean;
//   register: UseFormRegisterReturn;
//   errorMessage?: string;
//   className?: string;
// };

//  const Input = ({
//   label,
//   id,
//   type = "text",
//   isRequired = false,
//   register,
//   errorMessage,
//   className = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white",
// }: InputProps) => {
//   return (
//     <div className="mt-8 mb-0">
//     {/* <div> */}
//       <Label text={label} isRequired={isRequired} />
//       <input
//         id={id}
//         type={type}
//         {...register}
//         className={className}
//       />
//       <ErrorMessage message={errorMessage} />
//     </div>
//   );
// };

// export default Input;