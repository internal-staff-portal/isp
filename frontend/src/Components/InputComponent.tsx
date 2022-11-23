import React, {
  Dispatch,
  HTMLInputTypeAttribute,
  MouseEventHandler,
  SetStateAction,
} from "react";

//type for icon
type IconType = {
  Icon: (
    props: React.ComponentProps<"svg"> & { title?: string; titleId?: string },
  ) => JSX.Element;
  onClick?: MouseEventHandler<SVGSVGElement>;
};

//the props for the input component
type InputComponentProps = {
  disabled?: boolean;
  helpertext?: string;
  IconLeft?: IconType;
  IconRight?: IconType;
  hint?: string;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  setValue?: Dispatch<SetStateAction<string>>;
  state?: "error" | "success" | "normal";
  type: HTMLInputTypeAttribute;
  value?: string;
};

//the input component
export default function InputComponent({
  disabled = false,
  helpertext,
  IconLeft,
  IconRight,
  hint,
  label,
  name,
  placeholder,
  required = false,
  setValue = () => {},
  state = "normal",
  type,
  value,
}: InputComponentProps) {
  return (
    <div>
      <div className="flex justify-between">
        {label ? (
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor={name}
          >
            {label}
            {required ? <span className="text-red-600 pl-1">*</span> : ""}
          </label>
        ) : (
          ""
        )}
        {hint ? (
          <span className={`text-sm text-gray-500 ${helperStyles(state)}`}>
            {hint}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="relative mt-1 rounded-md shadow-sm">
        {IconLeft ? (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <IconLeft.Icon
              onClick={IconLeft.onClick ? IconLeft.onClick : () => {}}
              className={`h-5 w-5 ${iconStyles(state)} ${
                IconLeft.onClick
                  ? "hover:cursor-pointer"
                  : "pointer-events-none"
              }`}
              aria-hidden="true"
            />
          </div>
        ) : (
          ""
        )}
        <input
          className={`block w-full rounded-md focus:outline-none disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm ${inputStyles(
            state,
          )} ${IconLeft ? "pl-10" : ""} ${IconRight ? "pr-10" : ""}`}
          disabled={disabled}
          id={name}
          name={name}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {IconRight ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <IconRight.Icon
              onClick={IconRight.onClick ? IconRight.onClick : () => {}}
              className={`h-5 w-5 ${iconStyles(state)} ${
                IconRight.onClick
                  ? "hover:cursor-pointer"
                  : "pointer-events-none"
              }`}
              aria-hidden="true"
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {helpertext ? (
        <p className={`mt-2 text-sm ${helperStyles(state)}`}>{helpertext}</p>
      ) : (
        ""
      )}
    </div>
  );
}

function helperStyles(state: InputComponentProps["state"]): string {
  //general output
  let out: string[] = [];

  //error state
  if (state === "error") {
    out = [...out, "text-red-600"];
  }

  //success state
  if (state === "success") {
    out = [...out, "text-green-600"];
  }

  //success state
  if (state === "normal") {
    out = [...out, "text-gray-500"];
  }

  //return input styles
  return out.join(" ");
}

function iconStyles(state: InputComponentProps["state"]): string {
  //general output
  let out: string[] = [];

  //error state
  if (state === "error") {
    out = [...out, "text-red-500"];
  }

  //success state
  if (state === "success") {
    out = [...out, "text-green-500"];
  }

  //success state
  if (state === "normal") {
    out = [...out, "text-gray-400"];
  }

  //return input styles
  return out.join(" ");
}

function inputStyles(state: InputComponentProps["state"]): string {
  //general output
  let out: string[] = [];

  //error state
  if (state === "error") {
    out = [
      ...out,
      "border-red-300",
      "text-red-900",
      "placeholder-red-300",
      "focus:border-red-500",
      "focus:ring-red-500",
    ];
  }

  //success state
  if (state === "success") {
    out = [
      ...out,
      "border-green-300",
      "text-green-900",
      "placeholder-green-300",
      "focus:border-green-500",
      "focus:ring-green-500",
    ];
  }

  //success state
  if (state === "normal") {
    out = [
      ...out,
      "border-gray-300",
      "focus:border-indigo-500",
      "focus:ring-indigo-500",
    ];
  }

  //return input styles
  return out.join(" ");
}
