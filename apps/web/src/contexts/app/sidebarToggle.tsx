import { useState } from 'react'

export const useSidebarToggle =()=>{
    const [expanded,setexpanded]=useState(false);
    const handleExpand = ()=> {
        setexpanded(!expanded)
    }
return {expanded ,handleExpand }
}