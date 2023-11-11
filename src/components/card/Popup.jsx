import React from 'react';
import styles from './Popup.module.scss'; // 팝업 컴포넌트의 스타일을 import합니다.

export default function Popup({ isOpen, content, handleClose, handleLike }) {
  if (!isOpen) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popup_content}>
        {content}
        <button onClick={handleClose}>닫기</button>
      </div>
    </div>
  );
}