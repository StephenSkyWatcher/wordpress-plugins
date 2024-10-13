import * as React from "react";

const DetailBlock = (props) => {
	return (
		<div class="astro-capture-details-block">
			<h6 class="astro-capture-details-block_header">{props.title}</h6>
			<p class="astro-capture-details-block_value">{props.value}</p>
		</div>
	);
};

export default DetailBlock;