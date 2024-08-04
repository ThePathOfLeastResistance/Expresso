import React, { useEffect, useRef } from "react";
import { useStore } from "../util/stores";

export default function EditLabel({
    id,
    children
}: {
    id: string,
    children: React.ReactNode
}) {
    const hRef = useRef<HTMLHeadingElement>(null);
    const actionGroupName = useStore((state) => state.actionGroupName);

    function onDblClick() {
        // console.log("dbl click");
        if (!hRef.current) return;
        hRef.current.contentEditable = "true";
    }

    function onFocusOut(e: any) {
        // console.log("focus out");
        if (!hRef.current) return;
        hRef.current.contentEditable = "false";
        actionGroupName(id, hRef.current.textContent || "Action group");
    }

    useEffect(() => {
        if (hRef && hRef.current) {
            hRef.current.addEventListener("click", (e) => e.stopPropagation());
            hRef.current.addEventListener("dblclick", onDblClick);
            hRef.current.addEventListener("focusout", onFocusOut);
        }
        return () => {
            hRef.current?.removeEventListener("dblClick", onDblClick);
            hRef.current?.removeEventListener("focusout", onFocusOut);
            hRef.current?.removeEventListener("click", (e) => e.stopPropagation());
        };
    }, [hRef]);

    return (
        <h3 ref={hRef} className="cursor-text">
            {children}
        </h3>
    );
}