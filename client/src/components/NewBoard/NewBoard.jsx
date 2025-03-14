import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Formik, Form, Field } from 'formik';
import sprite from '../../assets/icons/icons.svg';
import { backgroundImages } from '../../assets/images/background_icons/index.js';
import { GreenButton } from '../common/FormButton/FormButton.styled.js';

const NewBoard = ({
  className,
  isOpen = true,
  onClose = () => console.log('Close function not implemented yet'),
  onCreate = () => console.log('Create function not implemented yet') }) => {

  const [selectedIcon, setSelectedIcon] = useState("icon-fourCircles");
  const [selectedBackground, setSelectedBackground] = useState('noImage.jpg');

  const handleCreate = (values) => {
    console.log('Creating board:', { ...values, icon: selectedIcon, background: selectedBackground });
    if (onCreate) {
      onCreate({ ...values, icon: selectedIcon, background: selectedBackground });
    }
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className={`${className} modal-overlay`} onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>New board</h2>
        <button className="close-button" onClick={onClose}>
          <svg width="18" height="18">
            <use href={`${sprite}#icon-closeBtn`}></use>
          </svg>
        </button>

        <Formik
          initialValues={{ title: '' }}
          onSubmit={handleCreate}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="title"
                type="text"
                placeholder="Title"
              />

              <div className="icons-section">
                <h3>Icons</h3>
                <div className="icons-container">
                  {['icon-fourCircles', 'icon-star', 'icon-loading', 'icon-puzzlePiece', 'icon-cube', 'icon-lightning', 'icon-threeCircles', 'icon-hexagon'].map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-button ${selectedIcon === icon ? 'selected' : ''}`}
                      onClick={() => setSelectedIcon(icon === selectedIcon ? null : icon)}
                    >
                      <svg width="18" height="18">
                        <use href={`${sprite}#${icon}`}></use>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="backgrounds-section">
                <h3>Background</h3>
                <div className="backgrounds-container">
                  {backgroundImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Fundal ${index}`}
                      className={selectedBackground === image ? 'selected' : ''}
                      onClick={() => setSelectedBackground(image === selectedBackground ? 'noImage.jpg' : image)}
                    />
                  ))}
                </div>
              </div>

              <GreenButton
                type="submit"
                text={
                  <>
                    <span className="plus-icon">
                      <svg width="28" height="28">
                        <use href={`${sprite}#icon-plusWhite`}></use>
                      </svg>
                    </span>
                    Create
                  </>
                }
                handlerFunction={() => {}}
                isDisabled={isSubmitting}
                className="create-button"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default NewBoard;
