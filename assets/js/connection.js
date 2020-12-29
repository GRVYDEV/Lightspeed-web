let pc = new RTCPeerConnection()
let log = msg => {
    document.getElementById('div').innerHTML += msg + '<br>'
}

pc.ontrack = function (event) {
    var el = document.createElement(event.track.kind)
    el.srcObject = event.streams[0]
    el.autoplay = true
    el.controls = true

    document.getElementById('remoteVideos').appendChild(el)
}

// pc.oniceconnectionstatechange = e => log(pc.iceConnectionState)
// pc.onicecandidate = event => {
//     if (event.candidate === null) {
//         console.log(pc.localDescription);
//         document.getElementById('localSessionDescription').value = btoa(JSON.stringify(pc.localDescription))
//     }
// }

// Offer to receive 1 audio, and 1 video tracks
pc.addTransceiver('audio', { 'direction': 'recvonly' })
// pc.addTransceiver('video', { 'direction': 'recvonly' })
pc.addTransceiver('video', { 'direction': 'recvonly' })


window.startSession = () => {
    let ws = new WebSocket("ws://stream.gud.software:8080/websocket")
    pc.onicecandidate = e => {
        if (!e.candidate) {
            console.log("Candidate fail")
            return
        }

        ws.send(JSON.stringify({ event: 'candidate', data: JSON.stringify(e.candidate) }))
    }

    ws.onclose = function (evt) {
        window.alert("Websocket has closed")
    }

    ws.onmessage = function (evt) {
        let msg = JSON.parse(evt.data)
        if (!msg) {
            return console.log('failed to parse msg')
        }

        switch (msg.event) {
            case 'offer':
                console.log("offer")
                let offer = JSON.parse(msg.data)
                if (!offer) {
                    return console.log('failed to parse answer')
                }
                pc.setRemoteDescription(offer)
                pc.createAnswer().then(answer => {
                    pc.setLocalDescription(answer)
                    ws.send(JSON.stringify({ event: 'answer', data: JSON.stringify(answer) }))
                })
                return

            case 'candidate':
                console.log("candidate")
                let candidate = JSON.parse(msg.data)
                if (!candidate) {
                    return console.log('failed to parse candidate')
                }

                pc.addIceCandidate(candidate)
        }
    }

    ws.onerror = function (evt) {
        console.log("ERROR: " + evt.data)
    }
    // let sd = document.getElementById('remoteSessionDescription').value
    // if (sd === '') {
    //     return alert('Session Description must not be empty')
    // }

    // try {
    //     pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(sd))))
    // } catch (e) {
    //     alert(e)
    // }
}
