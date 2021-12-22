import { ReactNode } from "react"
import styles from "./Button.module.scss"

interface Props {
    value: string
    icon: ReactNode
    onClick: Function
    bg: string
    span?: number
}

const Button = (props: Props) => {
    return (
        <div
            className={styles.buttonContainer}
            style={{
                backgroundColor: props.bg,
                gridColumn: props.span ? `span ${props.span}` : ""
            }}
            onClick={() => props.onClick()}
        >
            {props.icon}
            {props.value}
        </div>
    )
}

export default Button
