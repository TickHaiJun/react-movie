import styles from './ApplyInfo.module.css'
import { NumberKeyboard, PasscodeInput, Mask, DotLoading } from 'antd-mobile'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ApplyInfo({ applyDialogStauts, onConfirm, paymentMethod, eventDetails }) {
    const navigate = useNavigate()
    const [maskStatus, setMaskStatus] = useState(false)
    const [keyboardVisible, setKeyboardVisible] = useState(true); // 默认展开键盘
    const passcodeInputRef = useRef(null)

    const changePassword = (data) => {
        if (data.length == 6 && data == '123456') {
            setMaskStatus(true)
            setTimeout(() => {
                onConfirm();
            }, 1500);
        } 
    }

    useEffect(() => {
        if (applyDialogStauts) {
            passcodeInputRef.current.focus();
        }
    })

    return (
        <>
            <div className={styles.applyContainer}>
                <div className={styles.titleContainer}>请输入支付密码</div>
                <div className={styles.priceContainer}>
                    ¥{eventDetails?.price || 0}
                </div>
                <PasscodeInput ref={passcodeInputRef} seperated onChange={changePassword} keyboard={<NumberKeyboard visible={false} />} />
            </div>
            <Mask visible={maskStatus} onMaskClick={() => setMaskStatus(false)}>
                <DotLoading color='primary' style={{ '--size': '66px' }} />
            </Mask>
        </>
    )
}