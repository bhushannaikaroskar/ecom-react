import React, { useEffect } from "react";

export function useDocumentTitle(title) {
    useEffect(()=>{
        document.title = `Grand Store | ${title}`
    },[title])
}
