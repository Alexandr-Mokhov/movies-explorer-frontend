import './InfoTooltip.css';

export default function InfoTooltip({ isOpen, onClose, notificationText }) {
  return (
    <div className={`info-tooltip ${isOpen ? 'info-tooltip_opened' : ''}`} >
      <div className="info-tooltip__container">
        <button className="info-tooltip__close" type="button" onClick={onClose} />
        <div className="info-tooltip__image_type_err" />
        <h3 className="info-tooltip__title">
          {notificationText}
        </h3>
      </div>
    </div>
  )
}

