import React, { useEffect, useContext } from "react";
import { AppContext } from "../shared/global/provider/Provider";

export const EmptyView = () => {
  const app = useContext(
    AppContext
  );

  useEffect(() => {
/*     localStorage.getItem('token')? app.setSignInDialogOpen(false) :
 */    app.setSignInDialogOpen(true);
  },[]);
  return <div className="empty-view"></div>;
};
