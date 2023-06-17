import React, {MouseEventHandler, PropsWithChildren} from "react";

interface Props {
    className?: string
    type?: 'primary' | 'secondary' | 'white'
    onClick?: MouseEventHandler<any>
}

export const Button = ({children, className, type, onClick}: PropsWithChildren<Props>) => {
    className = className ?? ''
    type = type ?? 'primary'
    return (
        <button className={`button ${type} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}