import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const DropDownCompanies = ({ companies, onSelection }) => {
	return (
		<div className="container">
			<DropdownButton id="dropdown-basic-button" title="Select a company">
				{companies.map(company => (
					<div key={company.id}>
						<Dropdown.Item
							onClick={() => {
								onSelection(company.name);
							}}
						>
							{company.name}
						</Dropdown.Item>
					</div>
				))}
			</DropdownButton>
		</div>
	);
};

export default DropDownCompanies;
