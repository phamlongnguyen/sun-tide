import React from 'react'
import './Weather.scss'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosNotifications } from 'react-icons/io'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const Weather = () => {
  return (
    <div className="Weather__container">
      <div className="Weather__top">
        <GiHamburgerMenu />
        <div className="Weather__top__location">
          <p className="Weather__top__location--p">myENV</p>
          <p className="Weather__top__location--current">
            Current Location <MdKeyboardArrowDown />
          </p>
        </div>
        <IoIosNotifications />
      </div>
      <div className="Weather__center">
        <div>
          <img
            className="Weather__center__cloud"
            src={`/cloud.svg`}
            alt="moon"
          />
        </div>
      </div>
      <div className="Weather__bottom">
        <div className="Weather__bottom__info">
          <div className="Weather__bottom__info--title">PSI</div>
          <div className="Weather__bottom__info--psi">23</div>
          <div>Good</div>
        </div>
        <div className="Weather__bottom__info">
          <div className="Weather__bottom__info--title">RAIN</div>
          <div className="Weather__bottom__info--rain">0</div>
          <div>mm</div>
        </div>
        <div className="Weather__bottom__info">
          <div className="Weather__bottom__info--title">DENGUE</div>
          <div className="Weather__bottom__info--dengue " />
        </div>
        <div className="Weather__bottom__info">
          <AiOutlinePlusCircle className="Weather__bottom__info--add" />
          <div className="Weather__bottom__info--title">Add</div>
        </div>
      </div>
    </div>
  )
}

export default Weather
