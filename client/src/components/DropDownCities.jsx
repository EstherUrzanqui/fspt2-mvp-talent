import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const DropDownCities = ({ cities, onSelection }) => {
	return (
		<div className="container">
			<DropdownButton id="dropdown-basic-button" title="Select a city">
				{cities.map(city => (
					<div key={city.City}>
						<Dropdown.Item
							onClick={() => {
								onSelection(city.City);
							}}
						>
							{city.City}
						</Dropdown.Item>
					</div>
				))}
			</DropdownButton>
		</div>
	);
};

export default DropDownCities;
