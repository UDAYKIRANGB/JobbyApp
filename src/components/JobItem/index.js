import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    location,
    packagePerAnnum,
    rating,
    employmentType,
    companyLogoUrl,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-component">
      <li className="job-items-container">
        <div className="logo-name-item-container">
          <img
            src={companyLogoUrl}
            className="job-item-company-logo"
            alt="company logo"
          />
          <div>
            <h1 className="job-item-title">{title}</h1>
            <span className="rating-item">
              <FaStar /> <p>{rating}</p>
            </span>
          </div>
        </div>
        <div className="location-type-container">
          <div className="location-type">
            <div className="location-container">
              <IoLocationSharp />
              <p>{location}</p>
            </div>
            <div className="location-container">
              <MdWork />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="ctc">{packagePerAnnum}</p>
        </div>
        <hr className="job-item-line" />
        <h1 className="job-dis-heading">Description</h1>
        <p className="job-discription">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
