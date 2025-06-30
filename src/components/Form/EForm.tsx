"use client"
import React from 'react';
import {  FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';


type TFormConfig = {
    resolver?: any;
    defaultValues?: Record<string, any>;
  };
  
  type TFormProps = {
    children: React.ReactNode;
    onSubmit: (data: any) => void;
  } & TFormConfig;
const EFORM = ({children,onSubmit,resolver,defaultValues}:TFormProps) => {
   
   
   const formConfig: TFormConfig = {};
   if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }
   if (resolver) {
    formConfig["resolver"] = resolver;
  }
  
   const methods = useForm(formConfig)
   const {handleSubmit,reset} = methods
  

   const submit = async(data:FieldValues)=>{
        onSubmit(data)
        
        console.log(data);
   }
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)} >{children}</form>
        </FormProvider>
    );
};

export default EFORM;