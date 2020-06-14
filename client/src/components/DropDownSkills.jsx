import React from "react";
import { Form, Button } from "react-bootstrap";

class DropDownSkills extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			selectedSkills: [],
		};
	}

	toggleOptions = () => {
		this.setState({ visible: !this.state.visible });
	};

	handleSelection = event => {
		event.preventDefault();
		const { value } = event.target;
		const { onSelection } = this.props;
		const newState = {
			selectedSkills: [...this.state.selectedSkills, value],
		};
		this.setState(newState);
		onSelection(newState);
	};

	render() {
		const { skills } = this.props;
		const { visible } = this.state;
		return (
			<div className="container">
				<Button id="dropdown-basic-button" onClick={this.toggleOptions}>
					Select skills:
				</Button>
				{visible && (
					<Form>
						<Form.Control
							as="select"
							multiple
							class="form-control"
							id="exampleFormControlSelect2"
							value={skills}
							onChange={this.handleSelection}
						>
							{skills.map(skill => (
								<option key={skill.id}>{skill.title}</option>
							))}
						</Form.Control>
					</Form>
				)}
			</div>
		);
	}
}

export default DropDownSkills;
