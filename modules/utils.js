import config from "./config"

var utils = {
	rata: (params) => {
		var body = JSON.stringify({
			"to": config.topic,
			"data": {
				"telefono":         "TelegramMessage",
				"to":               "TelegramMessage",
				"tipoNotificacion": "bot telegram",
				"destinatario":     params.dest,
			}
		})
	
		console.log(body)
	
		return fetch("https://fcm.googleapis.com/fcm/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": config.googleApiKey
			},
			body: body
		}).then(r => r.text())
	}
}

export default utils