import React from "react";
import PropTypes from "prop-types"
import { fetchPopularRepos } from "../utils/api"
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from "react-icons/fa"
import Card from "./card"
import Loading from "./loading"
import Tooltip from "./tooltip"

function LanguagesNav({selected, onUpdateLanguage}){
	const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"]
	return (
		<ul className="flex-center">
			{
				languages.map(language => (
					<li key={language}>
						<button
							className="button-clear nav-link" 
							style={language === selected ? {color:"hotpink"} : null}
							onClick={() => onUpdateLanguage(language)}
						>
							{language}
						</button>
					</li>
				))
			}
		</ul>	
	)
}

LanguagesNav.propTypes = {
	selected: PropTypes.string.isRequired,
	onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({ repos }){
	return (
		<ul className="grid space-around">
			{repos.map((repo, index) => {
				const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
				const { login, avatar_url } = owner

				return (
					<li key={html_url}>
						<Card
							header={`#${index+1}`}
							avatar={avatar_url}
							href={html_url}
							name={login}
						>
							<ul className="card-list">
								<li>
									<Tooltip text="Github username">
										<FaUser color="#6495ED" size={22}></FaUser>
										<a href={`https://github.com${login}`}>{login}</a>
									</Tooltip>
								</li>
								<li>
									<FaStar color="#B0E0E6" size={22}></FaStar>
									{stargazers_count.toLocaleString()} stars
								</li>
								<li>
									<FaCodeBranch color="#7B68EE" size={22}></FaCodeBranch>
									{forks.toLocaleString()} forks
								</li>
								<li>
									<FaExclamationTriangle color="rgb(241, 138, 147)" size={22}></FaExclamationTriangle>
									{open_issues.toLocaleString()} open
								</li>
							</ul>
						</Card>
					</li>
				)
			})}
		</ul>
	)
}

ReposGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

export default  class Popular extends React.Component {
	state = {
		selectedLanguage: "All",
		repos: {},
		error: null
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage)
	}

	updateLanguage = (selectedLanguage) => {
		this.setState({
			selectedLanguage,
			error: null
		})

		if (!this.state.repos[selectedLanguage]){
			fetchPopularRepos(selectedLanguage)
			.then((data) => {
				this.setState(({ repos }) => ({
					repos: {
						...repos,
						[selectedLanguage]: data
					}
				}))
			})
			.catch(() => {
				console.warn("Error fetching repos: ", error)

				this.setState({
					error: "There was an error fetching the repositories"
				})
			})
		}
	}   

	isLoading = () => {
		const { selectedLanguage, repos, error } = this.state
		return !repos[selectedLanguage] && error === null
	}

	render () {
		const { selectedLanguage, repos, error } = this.state
		return (
			<React.Fragment>
				<LanguagesNav selected={selectedLanguage} onUpdateLanguage={this.updateLanguage}/>
				{this.isLoading() && <Loading text="Fetching Repos"/>}
				{error && <p className="center-text error">{error}</p>}
				{repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}></ReposGrid>}
			</React.Fragment>
		)
	}
}