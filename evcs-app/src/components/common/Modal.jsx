import React, { useEffect } from 'react';
import $ from 'jquery';

const Modal = React.forwardRef((props, ref) => {

  const {
    title,
    label,
    name,
    width,
    position,
    onModalClose,
    showCloseButton,
    children
  } = props;

  useEffect(() => {
    $(ref.current).modal('show');
    $(ref.current).modal({
      focus: true
    });
  }, []);

  return (
    <div
      ref={ref}
      className="modal fade" tabIndex="-1"
      aria-labelledby={label}
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false">
      <div 
        style={{maxWidth: `${width}`}}
        className=
          {`modal-dialog ${position} modal-dialog-scrollable`}>
        <div className="modal-content" style={{border: "2px solid #3AAFA9"}}>
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            {showCloseButton &&
              <button
                type="button"
                className="close text-white"
                name={name}
                onClick={onModalClose}
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            }
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
)
export default Modal;