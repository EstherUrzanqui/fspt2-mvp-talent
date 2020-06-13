import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import DropDownCompanies from "./components/DropDownCompanies";
import EmailTemplate from "./components/EmailTemplate";
import {
	Container,
	Row,
	Col,
	Card,
	Navbar,
	Carousel,
	Modal,
	Button,
} from "react-bootstrap";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			former: [],
			companies: [],
			candidatesByCompany: [],
			showContactForm: false,
			contactEmail: "",
		};
	}

	componentDidMount() {
		fetch("http://localhost:3001/api/candidates/skills/")
			.then(response => response.json())
			.then(data => {
				console.log("data", data);
				this.setState({
					former: data,
				});
			});

		fetch("http://localhost:3001/api/companies/")
			.then(response => response.json())
			.then(data => {
				this.setState({
					companies: data,
				});
			});
	}

	fetchSearchResults = (query = "") => {
		fetch(`http://localhost:3001/api/searchByDepartment/${query}`)
			.then(response => response.json())
			.then(response => {
				this.setState({
					former: response,
					loading: false,
				});
			})
			.catch(error => {
				console.log("Error fetching");
			});
	};

	fetchResultsByCompanies = (companyName = "") => {
		fetch(`http://localhost:3001/api/searchByCompany/${companyName}`)
			.then(response => response.json())
			.then(response => {
				console.log("data", response);
				this.setState({
					candidatesByCompany: response,
				});
			})
			.catch(error => {
				console.log("Error fetching");
			});
	};

	showModal = e => {
		console.log("value", e.target.value);
		this.setState({ showContactForm: true, contactEmail: e.target.value });
	};

	handleClose = e => {
		this.setState({ showContactForm: false });
	};

	render() {
		return (
			<div>
				<Navbar>
					<Navbar.Brand>
						<a href="http://localhost:3000/">COVID Talent</a>
					</Navbar.Brand>
				</Navbar>
				<Carousel>
					<Carousel.Item>
						<Carousel.Caption>
							<h3>Talent from Adidas</h3>
							<p>
								Adidas employ over 59,000 people. In 2019 we produced over 1.1
								billion products and generated sales of € 23.640 billion.
							</p>
						</Carousel.Caption>
						<img
							className="d-block w-10"
							src="data:image/png;base64,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"
							alt="First slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<Carousel.Caption>
							<h3>Talent from Mercedes Benz</h3>
							<p>
								Mercedes-Benz is one of the largest manufacturers of premium
								passenger cars. In 2019 it sold 2.4 million cars and 438,000
								vans.
							</p>
						</Carousel.Caption>
						<img
							className="d-block w-10"
							src="data:image/png;base64,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"
							alt="Second slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<Carousel.Caption>
							<h3>Talent from CPM International</h3>
							<p>
								CPM is in the business of People. On a global scale, our
								exceptional contact centre employees have been providing sales
								and service solutions for our clients for over 40 years
							</p>
						</Carousel.Caption>
						<img
							className="d-block w-10"
							src="data:image/png;base64,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"
							alt="Third slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<Carousel.Caption>
							<h3>Talent from Rover.com</h3>
							<p>
								Founded in 2011, Rover is the world's largest network of 5-star
								pet sitters and dog walkers.
							</p>
						</Carousel.Caption>
						<img
							className="d-block w-10"
							src="data:image/png;base64,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"
							alt="First slide"
						/>
					</Carousel.Item>
				</Carousel>

				<Container>
					<Row>
						<Col>
							<h5 className="webdescription">
								During COVID19 many companies have been forced to reduce their
								workforce on a large scale leaving professionals and talented
								people without a job. This website is intended to help your
								company to find the talent that you need. In here, the
								individuals are presented only by their experience and skills,
								for further information do not hesitate to contact them.
							</h5>
						</Col>
					</Row>
				</Container>

				<div>
					<SearchBar onSearch={this.fetchSearchResults} />
					<DropDownCompanies
						companies={this.state.companies}
						onSelection={this.fetchResultsByCompanies}
					/>
				</div>

				<div>
					<Container>
						<Row>
							  {" "}
							{this.state.former.map(candidate => (
								<div className="col-md-4" key={candidate.id}>
									<Col sm={12}>
										<Card style={{ width: "18rem" }}>
											<Card.Body>
												<Card.Title>Language</Card.Title>
												{candidate.mother_tongue}
												<Card.Title>Department</Card.Title>
												{candidate.department}
												<Card.Title>Skills</Card.Title>
												{candidate.title}
												<Card.Text>
													<h4>Experience</h4>
												</Card.Text>
												{candidate.experience}
												<Button
													onClick={this.showModal}
													value={candidate.email_address}
												>
													Contact
												</Button>
											</Card.Body>
										</Card>
									</Col>{" "}
									 
								</div>
							))}
						</Row>
					</Container>
					<Modal show={this.state.showContactForm} onHide={this.handleClose}>
						<EmailTemplate email={this.state.contactEmail} />
					</Modal>
				</div>
			</div>
		);
	}
}

export default App;
