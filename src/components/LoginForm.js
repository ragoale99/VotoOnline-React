import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import useInput from "../hooks/use-input";
import axios from "axios";
import { RoleContext } from "../App";
import "./LoginForm.css";

export default function LoginForm() {
	// eslint-disable-next-line no-unused-vars
	const { role, changeRole } = useContext(RoleContext);

	const checkPassword = (password) => {
		if (password.trim() === "") {
			return [false, "La password non può essere vuota"];
		} else if (password.length <= 4) {
			return [false, "La password deve avere almeno 4 caratteri"];
		}
		return [true, "Password valida"];
	};

	const checkEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email.trim() === "") {
			return [false, "L'email non può essere vuota"];
		} else if (!re.test(String(email).toLowerCase())) {
			return [false, "Email non valida"];
		}
		return [true, "Email valida"];
	};

	const {
		isTouched: touchedEmail,
		enteredValue: enteredEmail,
		enteredValueIsValid: enteredEmailIsValid,
		message: emailMessage,
		valueInputIsInvalid: emailInputIsInvalid,
		changeValueHandler: changeEmailHandler,
		blurValueHandler: blurEmailHandler,
		reset: resetEmailInput,
	} = useInput(checkEmail);

	const {
		isTouched: touchedPassword,
		enteredValue: enteredPassword,
		enteredValueIsValid: enteredPasswordIsValid,
		message: passwordMessage,
		valueInputIsInvalid: passwordInputIsInvalid,
		changeValueHandler: changePasswordHandler,
		blurValueHandler: blurPasswordHandler,
		reset: resetPasswordInput,
	} = useInput(checkPassword);

	let formIsValid = false;
	if (enteredPasswordIsValid && enteredEmailIsValid) {
		// check della form completa
		formIsValid = true;
	}

	const formSubmitHandler = (event) => {
		event.preventDefault();

		if (enteredPassword !== "admin") {
			axios
				.post("http://127.0.0.1:3100/login?__example=genericUser", {
					email: enteredEmail,
					password: enteredPassword,
				})
				.then((response) => {
					const ruolo = response.data.role;
					changeRole(ruolo);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			axios
				.post("http://127.0.0.1:3100/login?__example=admin", {
					email: enteredEmail,
					password: enteredPassword,
				})
				.then((response) => {
					const ruolo = response.data.role;
					changeRole(ruolo);
				})
				.catch((error) => {
					console.log(error);
				});
		}

		resetPasswordInput();
		resetEmailInput();
	};

	return (
		<div className="login-page">
			<div className="form-container">
				<div className="centered">
					<img
						src="/login.png"
						alt=""
						className={`img-login ${
							formIsValid
								? "filter-green"
								: (touchedEmail && touchedPassword) || emailInputIsInvalid || passwordInputIsInvalid
								? "filter-red"
								: ""
						}`}
					/>
				</div>
				<Form className="mb-5" onSubmit={formSubmitHandler}>
					<Form.Group
						controlId="formBasicEmail"
						className={emailInputIsInvalid ? "invalid" : touchedEmail ? "valid" : ""}>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Inserisci l'email"
							onChange={changeEmailHandler}
							onBlur={blurEmailHandler}
							value={enteredEmail}
							className="ombre"
						/>
						{touchedEmail && (
							<Form.Text className={emailInputIsInvalid ? "error-text" : "success-text"}>
								{emailMessage}
							</Form.Text>
						)}
					</Form.Group>
					<Form.Group
						controlId="formBasicPassword"
						className={passwordInputIsInvalid ? "invalid" : touchedPassword ? "valid" : ""}>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							autoComplete="on"
							placeholder="Inserisci la password"
							onChange={changePasswordHandler}
							onBlur={blurPasswordHandler}
							value={enteredPassword}
							className="ombre"
						/>

						{touchedPassword && (
							<Form.Text className={passwordInputIsInvalid ? "error-text" : "success-text"}>
								{passwordMessage}
							</Form.Text>
						)}
					</Form.Group>
					{!formIsValid ? (
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip id="tooltip">
									Bottone disabilitato! Controlla che email e password siano validi.
								</Tooltip>
							}>
							<span className="d-inline-block" style={{ width: "100%" }}>
								<Button
									type="submit"
									variant={
										(touchedEmail && touchedPassword) ||
										emailInputIsInvalid ||
										passwordInputIsInvalid
											? "danger"
											: "primary"
									}
									disabled
									aria-disabled="true"
									style={{ pointerEvents: "none" }}
									className="sub-button mt-2 ombre-btn">
									Accedi
								</Button>
							</span>
						</OverlayTrigger>
					) : (
						<Button type="submit" variant="success" className="sub-button mt-2 ombre-btn">
							Accedi
						</Button>
					)}
				</Form>
			</div>

			<div className="last"></div>
		</div>
	);
}
