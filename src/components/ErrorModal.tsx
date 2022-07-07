import { Modal } from 'bootstrap';

export const ErrorModal = ({ title, errorMsg, id }: { title: string; errorMsg: string; id: string }) => {
  return (
    <div className="modal fade" id={id} tabIndex={-1} role="dialog" aria-labelledby="rejectedExtensionModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="errorModalLabel">
              {title}
            </h3>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                console.log(document.getElementById(id));
                const modalInstance = Modal.getInstance(document.getElementById(id) as Element)!;
                modalInstance.hide();
              }}
            ></button>
          </div>
          <div className="modal-body">{errorMsg}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                const modalInstance = Modal.getInstance(document.getElementById(id) as Element)!;
                console.log(document.getElementById(id));
                modalInstance.hide();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
