import React from "react";
import { Dialog } from "primereact/dialog";

const DialogConfirm = ({ confirmDialog, hideConfirmDialog, handleConfirmOption, textConfirm }) => {
    const hideDialog = () => hideConfirmDialog();

    const confirmDialogFooter = (
        <React.Fragment>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg mr-2"
                onClick={() => hideDialog()}
            >
                Não
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg"
                onClick={() => handleConfirmOption()}
            >
                Sim
            </button>
        </React.Fragment>
    );

    return (
        <Dialog
            visible={confirmDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header={"Confirmação"}
            modal
            footer={confirmDialogFooter}
            onHide={hideDialog}
        >
            <div>
                {textConfirm && (
                    <span>{textConfirm}</span>
                )}
            </div>
        </Dialog>
    );
};

export default DialogConfirm;
