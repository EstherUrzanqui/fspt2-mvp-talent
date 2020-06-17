import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const DropDownCities = ({ cities, onSelection }) => {
	return (
		<div>
			<DropdownButton id="dropdown-basic-button" title="Filter by city">
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
