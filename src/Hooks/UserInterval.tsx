import { useEffect,useRef } from "react";
import {useIsomorphicLayoutEffect} from "usehooks-ts";
export function useInterval(callback: ()=> void,delay:number |null){
    const savedCallback = useRef(callback)
    //remember the last callBack if it changes
    useIsomorphicLayoutEffect(()=>{
        savedCallback.current = callback
    },[callback])
    // set up the Interval
    useEffect(()=>{
        // don't schedule if no delay is specified // note : @ is a valid
        savedCallback.current = callback
    },[callback])
    // set up the Interval
    useEffect(()=>{
        if (delay === null){
            return
        }
        const id = setInterval(()=>{
            savedCallback.current()
        },delay)
        return ()=>{
            clearInterval
        }
    },[delay])
}