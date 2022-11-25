import React from 'react';
import { func, oneOf, shape, string } from 'prop-types';

function MessageModal({ onClose, message }) {
  const visible = message.text.length !== 0;
  return (
    <div className={`modal ${visible && 'modal_is-open'}`}>
      <div className="modal__container">
        <p className={`modal__message_${message.status}`}>{message.text}</p>
        <button
          aria-label="close"
          type="button"
          className="modal__close-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

MessageModal.propTypes = {
  message: shape({ status: oneOf(['error', 'success']), text: string }),
  onClose: func.isRequired,
};

MessageModal.defaultProps = {
  message: { status: 'success', text: '' },
};

export default MessageModal;
