"use client";


import Navbar from "@/components/Shared/Navbar";
import { store } from "@/redux/store";
import { Provider } from "react-redux";


const Providers = ({ children }: { children: React.ReactNode }) => {
  
  
  return (
    <Provider store={store}>
         <Navbar />
     {children}
    </Provider>
  );
};

export default Providers;