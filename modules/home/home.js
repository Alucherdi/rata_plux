import React from "react"
import {
	Text,
	View,
	AppState,
	Clipboard
} from "react-native"

import utils from "../utils"

class Home extends React.Component {
	state = {
		appState: AppState.currentState
	}

	componentDidMount() {
		AppState.addEventListener("change", this._handleAppStateChange)
	}

	componentWillUnmount() {
		AppState.removeEventListener("change", this._handleAppStateChange)
	}

	_handleAppStateChange = (nextAppState) => {
		if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
			//check for phone numbers in clipboard
			Clipboard.getString().then(clip => {
				var number = this.searchForNumber(clip)
				if (number) {
					utils.rata({
						dest: number[0]
					}).then(result => {
						console.log(result)
					})
				} else {
					alert("No se detectó ningún número en tu clipboard")
				}
			})

		}

		this.setState({ appState: nextAppState })
	}

	searchForNumber = (text) => {
		return text.replace(
			/(-|\/|\s)/g, ""
		).match(
			/\d{10}/
		)
	}


	render() {
		return (
			<View>
				<Text>
					State is: {this.state.appState}
				</Text>
			</View>
		)
	}
}

export default Home