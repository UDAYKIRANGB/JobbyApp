import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import JobItem from '../JobItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentTypes: [],
    locationTypes: [],
    salaryRange: '',
    jobsList: [],
    profileDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/profile'

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    const {
      searchInput,
      employmentTypes,
      salaryRange,
      locationTypes,
    } = this.state

    const employmentType = employmentTypes.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedJobsList = data.jobs.map(each => ({
        id: each.id,
        title: each.title,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        employmentType: each.employment_type,
        companyLogoUrl: each.company_logo_url,
        jobDescription: each.job_description,
      }))

      const filteredJobs =
        locationTypes.length === 0
          ? updatedJobsList
          : updatedJobsList.filter(job =>
              locationTypes.some(loc =>
                job.location.toLowerCase().includes(loc.toLowerCase()),
              ),
            )

      this.setState({
        jobsList: filteredJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onChangeEmploymentType = event => {
    const {employmentTypes} = this.state
    const {value, checked} = event.target
    if (checked) {
      this.setState(
        {employmentTypes: [...employmentTypes, value]},
        this.getJobs,
      )
    } else {
      this.setState(
        {
          employmentTypes: employmentTypes.filter(each => each !== value),
        },
        this.getJobs,
      )
    }
  }

  onChangeLocationType = event => {
    const {locationTypes} = this.state
    const {value, checked} = event.target
    if (checked) {
      this.setState(
        {
          locationTypes: [...locationTypes, value],
        },
        this.getJobs,
      )
    } else {
      this.setState(
        {
          locationTypes: locationTypes.filter(each => each !== value),
        },
        this.getJobs,
      )
    }
  }

  onChangeSalary = event => {
    this.setState({salaryRange: event.target.id}, this.getJobs)
  }

  renderNoJobsView = () => (
    <div className="no-jobs-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderSuccessUI = () => {
    const {
      employmentTypesList,
      salaryRangesList,
      locationTypesList,
    } = this.props
    const {jobsList, profileDetails, searchInput} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <>
        <Header />
        <div className="job-details-name-container">
          <div className="job-container">
            <div className="search-input-icon">
              <input
                type="search"
                role="searchbox"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="profile-container">
              <img
                src={profileImageUrl}
                className="profile-logo"
                alt="profile"
              />
              <h1 className="profile-name">{name}</h1>
              <p className="description">{shortBio}</p>
            </div>
            <hr className="line" />
            <h1 className="list-heading">Type of Employment</h1>
            <ul className="employment-list">
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId} className="list-item">
                  <input
                    type="checkbox"
                    id={each.employmentTypeId}
                    value={each.employmentTypeId}
                    onChange={this.onChangeEmploymentType}
                  />
                  <label htmlFor={each.employmentTypeId}>{each.label}</label>
                </li>
              ))}
            </ul>
            <hr className="line" />
            <h1 className="list-heading">salary Range</h1>
            <ul className="employment-list">
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId} className="list-item">
                  <input
                    type="radio"
                    id={each.salaryRangeId}
                    name="salary"
                    value={each.salaryRangeId}
                    onChange={this.onChangeSalary}
                  />
                  <label htmlFor={each.salaryRangeId}>{each.label}</label>
                </li>
              ))}
            </ul>
            <hr className="line" />
            <h1 className="list-heading">Location Type</h1>
            <ul className="employment-list">
              {locationTypesList.map(each => (
                <li key={each.locationTypeId} className="list-item">
                  <input
                    type="checkbox"
                    id={each.locationTypeId}
                    value={each.locationTypeId}
                    onChange={this.onChangeLocationType}
                  />
                  <label htmlFor={each.locationTypeId}>{each.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="search-card-container">
            <div className="second-search-input-icon">
              <input
                type="search"
                role="searchbox"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                value={searchInput}
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="jobs-container">
              {jobsList.length === 0
                ? this.renderNoJobsView()
                : jobsList.map(each => (
                    <JobItem jobDetails={each} key={each.id} />
                  ))}
            </ul>
          </div>
        </div>
      </>
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
      <button type="button" onClick={this.getProfile} className="ready-btn">
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
    return this.renderUI()
  }
}

export default Jobs
