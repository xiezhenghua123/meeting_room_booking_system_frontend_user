import { useTranslation } from 'react-i18next'

import centerPng from '@/assets/images/error-page/center.png'
import leftBottomSvg from '@/assets/images/error-page/left-bottom.svg'
import rightTopSvg from '@/assets/images/error-page/right-top.svg'
import backIcon from '@/assets/images/error-page/back-icon.svg'
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const { t } = useTranslation()
  const location = useNavigate()
  return (
    <div className="position-relative h-vh">
      <div className="flex flex-col pt-4rem items-center">
        <h1 className="font-bold text-5.5rem">{t('404')}</h1>
        <p className='text-2rem'>{t('We’re working on it!')}</p>
        <img
          src={centerPng}
          alt=""
          className="w-30.72rem h-auto mb-1rem"
        />
        <div className='w-13.25rem h-3.93rem rounded-1.9rem flex justify-center items-center bg-#FFF4DE border border-#000 border-solid'>
          <img src={backIcon} alt="" className='w-2.1875rem h-2.1875rem mr-0.57rem mb-0.4rem'/>
          <span className='text-1.2rem mr-0.5rem cursor-pointer' onClick={()=>{location('/')}}>{t('Go Home')}</span>
        </div>
      </div>
      <img
        src={leftBottomSvg}
        alt=""
        className="position-absolute bottom-0 left-0 h-50%"
      />
      <img
        src={rightTopSvg}
        alt=""
        className="position-absolute right-0 top-0 h-85%"
      />
    </div>
  )
}

export default ErrorPage
