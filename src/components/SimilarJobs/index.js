import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {details} = props
  const {
    id,
    title,
    rating,
    location,
    employmentType,
    companyLogoUrl,
    jobDescription,
  } = details

  return (
    <li className="similar-job" key={id}>
      <div className="similar-logo-name-container">
        <img
          src={companyLogoUrl}
          className="similar-company-logo"
          alt="similar job company logo"
        />
        <div>
          <h1 className="similar-job-title-name">{title}</h1>
          <span className="similar-rating">
            <FaStar /> <p>{rating}</p>
          </span>
        </div>
      </div>
      <h1 className="similar-job-title-description">Description</h1>
      <p className="similar-job-discription">{jobDescription}</p>
      <div className="similar-location-type">
        <div className="similar-location-container">
          <IoLocationSharp />
          <p>{location}</p>
        </div>
        <div className="similar-location-container">
          <MdWork />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
