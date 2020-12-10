import React, { useEffect, useContext } from "react";
import { AppContext } from "../shared/global/provider/Provider";

export const EmptyView = () => {
  const app = useContext(
    AppContext
  );

  useEffect(() => {
    app.setSignInDialogOpen(true);
  });
  return <div className="empty-view"></div>;
};
