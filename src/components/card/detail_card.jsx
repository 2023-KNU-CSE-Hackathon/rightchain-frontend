import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import styles from "./detail_card.module.scss";

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

    Item: ({ id, title, category, subcategory, region, quantity, time, progress, ...rest }) => {
        const progressBar = useRef();

        useEffect(() => {
            const timeout = setTimeout(() => {
                progressBar.current.style.transform = `scaleX(${progress})`;
            }, 100);
            return () => clearTimeout(timeout);
        }, [progress]);

        return (
            <div className={styles.item_container} {...rest}>
                <div className={styles.mainText}> {id} 사건 처리중</div>

                <div className={styles.description}>
                    <p>
                        {category}/{subcategory} - {region}
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
                                <span>{quantity}차</span>
                                <span>처리중</span>
                            </h2>
                        </div>

                        <div className={styles.time}>
                            <FontAwesomeIcon icon={faClock} />
                            <p>{time} 시간 남음</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};