import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AppContext, UserContext } from "../../shared/global/provider/Provider";
import { deleteUser } from "../../shared/api/service/UserService";
import './DeleteConfirmDialog.css'
export const DeleteConfirmDialog = () => {
  const app = useContext(AppContext);
  const user = useContext(UserContext);

  const [responseMessage, setResponseMessage] = useState();

  const deleteAccount = async () => {
    const response = await deleteUser();
    setResponseMessage(response.data.message.msgBody);
    if (response.data.message.msgError === false) {
      localStorage.removeItem('favouriteCity')
      handleClose()
      user.setAuthenticatedUser(false);
    }
  };

  const handleClose = () => {
    app.setDeleteConfirmDialogOpen(false);
  };

  return (
    <Dialog open={app.deleteConfirmDialogOpen} onClose={handleClose} classes={{paperWidthSm: "delete-dialog-wrapper"  }}>
      <DialogTitle classes={{root: "delete-dialog-header"  }}>Are you sure you want to delete your account?</DialogTitle>
      <DialogContent>
        <DialogContentText classes={{root: "delete-dialog-text"  }}>
          Your account will be lost forever!
        </DialogContentText>
        <DialogContentText>{responseMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus classes={{textPrimary: "delete-dialog-button"  }}>
          Cancel
        </Button>
        <Button onClick={deleteAccount} color="primary" classes={{textPrimary: "delete-dialog-button"  }}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
