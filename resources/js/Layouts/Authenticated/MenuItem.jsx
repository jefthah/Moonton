import { Link } from "@inertiajs/react";
import React from "react";

export default function MenuItem({
    link,
    icon,
    text,
    isActive,
    method = "get",
}) {
    if (!link) {
        return (
            <div className={`side-link ${isActive ? "active" : ""}`}>
                {icon}
                {text}
            </div>
        );
    }

    return (
        <Link
            href={route(link)}
            className={`side-link ${isActive ? "active" : ""}`}
            method={method}
            as={method !== "get" ? "button" : undefined}
        >
            {icon}
            {text}
        </Link>
    );
}
