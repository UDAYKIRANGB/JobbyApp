import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-header-logo"
        />
      </Link>
      <ul className="header-icons">
        <Link to="/" className="link-logo-component">
          <li className="header-icon-item">
            <IoMdHome className="icon" />
          </li>
        </Link>
        <Link to="/jobs" className="link-logo-component">
          <li className="header-icon-item">
            <BsFillBriefcaseFill className="icon" />
          </li>
        </Link>
        <Link to="/login" className="link-logo-component">
          <li className="header-icon-item">
            <button
              type="button"
              onClick={onClickLogout}
              className="logout-btn"
            >
              <IoIosLogOut className="icon" />
            </button>
          </li>
        </Link>
      </ul>
      <div className="header-options">
        <Link to="/" className="link-component">
          Home
        </Link>
        <Link to="/jobs" className="link-component">
          Jobs
        </Link>
      </div>
      <Link to="/login" className="link-component">
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </Link>
    </div>
  )
}

export default withRouter(Header)
