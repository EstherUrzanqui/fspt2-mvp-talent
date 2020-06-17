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

	// SELECTING MORE THAN ONE SKILL BUT PASSING TO ON SELECTION DOESN'T WORK
	// handleSelection = event => {
	// 	event.preventDefault();
	// 	const { value } = event.target;
	// 	const { onSelection } = this.props;
	// 	const newState = {
	// 		selectedSkills: [...this.state.selectedSkills, value],
	// 	};
	// 	this.setState(newState);
	// 	onSelection(newState);
	// };

	// SELECTING ONLY ONE SKILL AND PASSING TO ON SELECTION WORKING
	handleSelection = event => {
		event.preventDefault();
		const { value } = event.target;
		const { onSelection } = this.props;
		onSelection(value);
	};

	render() {
		const { skills } = this.props;
		const { visible } = this.state;
		return (
			<div>
				<Button id="dropdown-basic-button" onClick={this.toggleOptions}>
					Filter by skills:
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
