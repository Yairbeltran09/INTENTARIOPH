import { FC, ReactNode } from "react"

export const TitlePage: FC<{ name: string, children?: ReactNode }> = ({ name, children }) => {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">{name}</h1>

            {children && (
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}