"use client";

import { Provider } from "react-redux";
import reduxStore from './store';

export const Providers=(props:any)=>{
    return <Provider store={reduxStore}>{props.children}</Provider>
}