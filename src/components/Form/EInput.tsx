"use client"
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface SInput {
    type:string;
    placeholder:string;
    name:string;
    label:string;
    className?:string
}

const EINPUT = ({type,placeholder,name,label,className}:SInput) => {
    
    const {control} = useFormContext()
    return (
        
        <>
         <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`grid w-full gap-1.5 ${className}`}>
          {label && <Label htmlFor={name}>{label}</Label>}
          <Input
            {...field}
            type={type}
            id={name}
            placeholder={placeholder}
            value={field.value ?? ""}
            className={error ? "border-red-500 focus:ring-red-500" : ""}
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
        </>
       
        
    );
};

export default EINPUT;