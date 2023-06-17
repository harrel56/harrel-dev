import React, {PropsWithChildren} from "react";

interface Props {
    className?: string
    type?: 'primary' | 'secondary' | 'white'

    [key: string]: unknown
}

export const Button = ({children, className, type, ...other}: PropsWithChildren<Props>) => {
    className = className ?? ''
    type = type ?? 'primary'
    return (
        <button className={`button ${type} ${className}`} {...other}>
            {children}
        </button>
    )
}