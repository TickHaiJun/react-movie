
import { ResultPage } from 'antd-mobile'
import { AlipayCircleFill } from 'antd-mobile-icons'
import { useNavigate} from 'react-router-dom';

export default () => {
  const details = [
    {
      label: '肯德基（嘉里中心店）',
      value: '¥ 36.50',
      bold: true,
    },
    {
      label: '付款方式',
      value: '账户余额',
    },
  ]

  const navigate = useNavigate();

  const handleConfirm = () =>{
    console.log("TEST")
    navigate('/', { replace: true });
  }


  return (
    <ResultPage
      status='waiting'
      title={<div style={{ fontSize: 15 }}>支付成功</div>}
      description={
        <>
          <span style={{ fontSize: 32, color: '#ffffff', marginRight: 4 }}>
            ¥
          </span>
          <span style={{ fontSize: 48, color: '#ffffff' }}>36.50</span>
        </>
      }
      icon={<AlipayCircleFill />}
      details={details}
      primaryButtonText='完成'
      onPrimaryButtonClick={handleConfirm}
    >

    </ResultPage>
  )
}