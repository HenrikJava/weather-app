import React, { useEffect, useContext } from "react"
import {SignInDialogContext} from '../shared/global/provider/SignInDialogProvider'

export const EmptyView = () => {
    const [signInDialogOpen, setSignInDialogOpen] = useContext(SignInDialogContext);

    useEffect(() => {
        setSignInDialogOpen(true)
    })
    return (
        <div className="empty-view"></div>
    )
}