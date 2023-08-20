import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AgoraUIKit, {layout } from 'agora-react-uikit';

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isHost, setHost] = useState(false)
  const [isPinned, setPinned] = useState(false)
  const [videocall, setVideocall] = useState(true)
  const styles = {
    container: { width: '100%', height: '100vh', display: 'flex', flex: 1, backgroundColor: '#007bff22' },
    heading: { textAlign: 'center' , marginBottom: 0 },
    videoContainer: { display: 'flex', flexDirection: 'column', flex: 1, height : '100vh', width : '700px' },
    nav: { display: 'flex', justifyContent: 'space-around' },
    btn: { backgroundColor: '#007bff', cursor: 'pointer', borderRadius: 5, padding: 5, color: '#ffffff', fontSize: 20 },
    containerInner: {display: 'flex', flex: 1, alignContent: 'center', alignItems: 'center', marginBottom: 10}
  }
  const props = {
    rtcProps: {
      appId: '84b9c536d1fe47db8eda6dd3ac0d6b0a',
      channel: 'channel1',
      token: '007eJxTYPgvt2JiZf3FQNNrBl5l/VvdnF0UeP7O7s3Ynj13ZvFS7TYFBguTJMtkU2OzFMO0VBPzlCSL1JREs5QU48RkgxSzJIPEiFMPUxoCGRly0gVYGRkgEMTnYEjOSMzLS80xZGAAAOdlIU0=', // pass in channel token if the app is in secure mode
      layout: isPinned ? layout.pin : layout.grid,
    },
    callbacks: {
      EndCall: () => setVideocall(false)
    },
      styleProps: {
        localBtnContainer: {backgroundColor: 'cyan', overflow : 'hidden'}
    }
  }
  return (
    <>
      <div style={styles.container}>
      {videocall ? (
        <div style={styles.videoContainer}>
          <div style={styles.nav}>
              <p style={{ fontSize: 20, width: 200, color : 'black' }}>You're {isHost ? 'a host' : 'an audience'}</p>
              <p style={styles.btn} onClick={() => setHost(!isHost)}>{isHost ? 'Give up host' : 'Become host'}</p>
              <p style={styles.btn} onClick={() => setPinned(!isPinned)}>Change Layout</p>
            </div>
          <AgoraUIKit
            rtcProps={props.rtcProps}
            callbacks={props.callbacks}
            styleProps={props.styleProps}
            />
          </div>
      ) : (
        <h3 style={styles.btn} onClick={() => setVideocall(true)}>Start Call</h3>
      )}
    </div>
    </>
  )
}

export default App
