import React, {useEffect} from 'react';
import $ from 'jquery';

const Modal = React.forwardRef ((props, ref) => {

  const { 
    title,
    label,
    name,
    onModalClose,
    children
  } = props;

  useEffect(() => {
      $(ref.current).modal('show');
  }, []);

  return (
    <div
      ref={ref}
      className="modal" tabIndex="-1"
      aria-labelledby={label}
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              name={name}
              onClick={onModalClose}
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
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