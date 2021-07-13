import React, { useContext } from "react";
import { VotationsContext } from "../../App";
import "./GenericContent.css";

export default function GenericContent() {
	const { votations, changeVotations } = useContext(VotationsContext);
	return (
		<div className="generic-content">
			{votations.map((votation) => {
				return (
					<div key={votation.id} className="item">
						<p>{votation.title}</p>
					</div>
				);
			})}
		</div>
	);
}
