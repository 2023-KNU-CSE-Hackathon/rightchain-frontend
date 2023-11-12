import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import styles from "./Card.module.scss";
import Popup from './Popup'; // 팝업 컴포넌트를 import합니다.

export const Card = {
  Container: ({ children, ...rest }) => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container} {...rest}>
          {children}
        </div>
      </div>
    );
  },

  Item: ({ name, case_num, title, content, is_case_close, school_name, progress, ...rest }) => {
    const progressBar = useRef();
    const [isOpen, setIsOpen] = useState(false); // 팝업의 열림/닫힘 상태를 추가합니다.
    const [popupContent, setPopupContent] = useState(null); // 팝업 컨텐츠를 저장할 상태를 추가합니다.

    useEffect(() => {
      const timeout = setTimeout(() => {
        progressBar.current.style.transform = `scaleX(${progress})`;
      }, 100);
      return () => clearTimeout(timeout);
    }, [progress]);

    const handleOpen = () => {
        if (!Array.isArray(wallet)) return;
      const content = (
        <div>
          <h2>사건번호: {case_num}</h2>
          <ul>
            {wallet.map((address, index) => (
              <li key={index}>
                단계 {index+1}: {address}
              </li>
            ))}
          </ul>
        </div>
      );

      setPopupContent(content);
      setIsOpen(true);
    }

    const handleClose = () => {
      setIsOpen(false);
    }

    return (
      <div className={styles.item_container} onClick={handleOpen} {...rest}>
        <div className={styles.mainText}> {case_num} 사건 처리중</div>

        <div className={styles.description}>
          <p>
            {name} - {title}
          </p>
          <h3>{title}</h3>
        </div>

        <div className={styles.info}>
          <div className={styles.progress_bar}>
            <div></div>
            <div ref={progressBar}></div>
          </div>

          <div className={styles.remain}>
            <div className={styles.quantity}>
              <h2>
                <span>{case_num}</span>
                <span>처리중</span>
              </h2>
            </div>

            <div className={styles.time}>
              <FontAwesomeIcon icon={faClock} />
              <p>{school_name}</p>
            </div>
          </div>
        </div>

        <Popup isOpen={isOpen} content={popupContent} handleClose={handleClose} /> 
      </div>
    );
  },
};
