import { Button } from 'antd'
import { useState } from 'react'

type Props = {
  defaultTime?: number,
  sendCaptcha: () => Promise<void>
}

const SendCaptcha = ({ defaultTime = 60, sendCaptcha }: Props) => {
  const [disabled, setDisabled] = useState(false)
  const [currentTime, setCurrentTime] = useState(defaultTime)
  // 倒计时 使用requestAnimationFrame
  const countDown = async () => {
    await sendCaptcha()
    setDisabled(true)
    let startTime: number
    const count = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp
      }
      const elapsedTime = timestamp - startTime
      setCurrentTime(Math.ceil((defaultTime * 1000 - elapsedTime) / 1000))
      if (elapsedTime < defaultTime * 1000) {
        requestAnimationFrame(count)
      } else {
        setDisabled(false)
        setCurrentTime(defaultTime)
      }
    }
    requestAnimationFrame(count)
  }

  return (
    <Button
      className="w-full"
      disabled={disabled}
      type="primary"
      onClick={countDown}
    >
      发送验证码 {disabled ? `${currentTime}s` : ''}
    </Button>
  )
}

export default SendCaptcha
