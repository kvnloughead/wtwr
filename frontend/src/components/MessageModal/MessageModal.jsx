import React from 'react';
import { func, oneOf, shape, string } from 'prop-types';

// import useEscape from '../../hooks/useEscape';

function MessageModal({ onClose, data }) {
  const visible = data.text.length !== 0;
  // useEscape(onClose);

  return (
    <div className={`modal ${visible && 'modal_is-open'}`}>
      <div className="modal__container">
        <h2 className="modal__title modal__title_place_message">
          {data.status === 'success' ? 'Success!' : 'Something went wrong'}
        </h2>
        <p className={`modal__message modal__message_${data.status}`}>
          {data.text}
        </p>
        <button
          aria-label="close"
          type="button"
          className="modal__close-button"
          onClick={onClose}
          tabIndex={0}
        />
      </div>
    </div>
  );
}

MessageModal.propTypes = {
  data: shape({
    status: oneOf(['success', 'error', '']),
    text: string,
  }),
  onClose: func.isRequired,
};

MessageModal.defaultProps = {
  data: { status: '', text: '' },
};

export default MessageModal;
