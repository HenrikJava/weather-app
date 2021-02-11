import React, { useEffect, useContext } from "react";
import { AppContext } from "../shared/global/provider/Provider";

export const EmptyView = () => {
  const app = useContext(AppContext);

  useEffect(() => {
    /*Empty view is used for both profilepage when not signed in and
    as an '404' page. And the profilepage should have the signin dialog*/
    localStorage.getItem("token")
      ? app.setSignInDialogOpen(false)
      : app.setSignInDialogOpen(true);
  }, [app]);
  return <div className="empty-view"></div>;
};
