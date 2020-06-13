import React from "react";
import emailjs from "emailjs-com";

class EmailTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subject: "",
			email: props.email,
			from: "",
			message: "",
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit() {
		const template_params = {
			"candidates.email_address": "candidates.email_address_value",
		};
		const service_id = "default_service";
		const template_id = "first_contact_email";

		emailjs
			.send(
				service_id,
				template_id,
				template_params,
				"user_2853rwzQwOgtGRHnfnFJO"
			)
			.then(
				response => {
					console.log("SUCCESS!", response.status, response.text);
				},
				err => {
					console.log("FAILED...", err);
				}
			);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label className="text-muted">Email address</label>
						<input
							type="email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
							placeholder="Enter email"
						/>
						<label className="text-muted">Subject</label>
						<input
							type="text"
							name="subject"
							className="texp-primary"
							value={this.state.subject}
							onChange={this.handleChange}
							placeholder="subject"
						/>
						<label className="text-muted">Name</label>
						<input
							type="text"
							name="from"
							className="texp-primary"
							value={this.state.from}
							onChange={this.handleChange}
							placeholder="name"
						/>
						<label className="text-muted">Message</label>
						<input
							type="text"
							name="message"
							className="texp-primary"
							value={this.state.message}
							onChange={this.handleChange}
						/>

						<button variant="primay" type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default EmailTemplate;