import { FC } from "react"

export const TitlePage: FC<{name: string}> = ({name}) => {
    return (
        <div className="pagetitle">
            <h1 style={{ color: 'black' }}>{name}</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="index.html" style={{ color: 'black' }}>Home</a>
                    </li>
                    <li className="breadcrumb-item active" style={{ color: 'black' }}>{name}</li>
                </ol>
            </nav>
        </div>
    )
}