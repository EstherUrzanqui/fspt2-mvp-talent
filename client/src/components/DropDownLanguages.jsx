import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const DropDownLanguages = ({ languages, onSelection }) => {
	return (
		<div>
			<DropdownButton id="dropdown-basic-button" title="Filter by language">
				{languages.map(language => (
					<div key={language.mother_tongue}>
						<Dropdown.Item
							onClick={() => {
								onSelection(language.mother_tongue);
							}}
						>
							{language.mother_tongue}
						</Dropdown.Item>
					</div>
				))}
			</DropdownButton>
		</div>
	);
};

export default DropDownLanguages;
