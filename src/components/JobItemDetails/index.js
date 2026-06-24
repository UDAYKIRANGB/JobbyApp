import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {MdWork} from 'react-icons/md'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobList()
  }

  onClickReady = () => {
    this.getJobList()
  }

  getJobList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const jwtToken = Cookie.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const jobDetails = data.job_details
    if (response.ok) {
      const updatedLifeAtCompany = {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }

      const updatedSkills = jobDetails.skills?.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const updatedJobDetails = {
        id: jobDetails.id,
        title: jobDetails.title,
        employmentType: jobDetails.employment_type,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        jobDescription: jobDetails.job_description,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }

      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        id: each.id,
        employmentType: each.employment_type,
        companyLogoUrl: each.company_logo_url,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetails: {
          ...updatedJobDetails,
          skills: updatedSkills,
          lifeAtCompany: updatedLifeAtCompany,
        },
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessUI = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      title,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills = [],
      lifeAtCompany = {},
      companyWebsiteUrl,
    } = jobDetails || {}

    return (
      <div className="job-item-details-container">
        <Header />
        <div className="job-item-container">
          <div className="logo-name-container">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="job-title-rating-container">
              <h1 className="job-title">{title}</h1>
              <span className="rating">
                <FaStar /> <p>{rating}</p>
              </span>
            </div>
          </div>
          <ul className="location-type-container">
            <div className="location-type">
              <li className="location-container">
                <IoLocationSharp size={20} />
                <p className="location-item-details-heading">{location}</p>
              </li>
              <li className="location-container">
                <MdWork size={20} />
                <p className="location-item-details-heading">
                  {employmentType}
                </p>
              </li>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </ul>
          <hr className="item-line" />
          <div className="description-visit-container">
            <h1 className="job-discription-heading">Description</h1>
            <a
              className="visit-heading"
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit
            </a>
          </div>
          <p className="job-details-discription">{jobDescription}</p>
          <h1 className="skills">Skills</h1>
          <ul className="skills-list">
            {skills.map(each => (
              <li className="list-item" key={each.name}>
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skills-icon"
                />
                <p className="skills-title">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company">Life at company</h1>
          <div className="company-life-container">
            <p className="company-life-discription">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              className="company-life-image"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-job-title">Similar Jobs</h1>
        <ul className="similar-job-list">
          {similarJobs.map(each => (
            <SimilarJobs details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLodingUI = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureUI = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onClickReady}>
        Retry
      </button>
    </div>
  )

  renderUI = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessUI()
      case apiStatusConstants.failure:
        return this.renderFailureUI()
      case apiStatusConstants.inProgress:
        return this.renderLodingUI()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderUI()}</>
  }
}

export default JobItemDetails
