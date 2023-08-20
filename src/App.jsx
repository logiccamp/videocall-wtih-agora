import { useState } from 'react'
import AgoraUIKit, {layout } from 'agora-react-uikit';

import './App.css'
import VideoCall from './components/video_call';
import { useParams } from 'react-router-dom';
import VideoCallAudience from './components/video_call_audience';

function App() {
  const params = useParams();
  const [joined, setJoined] = useState(false)
  const [count, setCount] = useState(0)
  const [userType, setUserType] = useState(params.type)
  const [isHost, setHost] = useState(false)
  const [isPinned, setPinned] = useState(true)
  const [videocall, setVideocall] = useState(true)
  
  const styles = {
    container: { width: '100vw', height: '95vh', overflow : 'hidden', minHeight : '400px', display: 'flex',  justifyContent : 'center', flex: 1},
    heading: { textAlign: 'center', marginBottom: 0 },
    videoContainer: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent : 'center' },
    // videoContainer: { overflow : 'hidden' },
    nav: { display: 'flex', zIndex : 12121121, justifyContent: 'end', right : '10px', gap : '4px', position : 'fixed', },
    btn: { backgroundColor: '#007bff', cursor: 'pointer', borderRadius: 5, padding: 5, color: '#ffffff', fontSize: 20 },
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
      localBtnContainer: {backgroundColor: 'red', overflow : 'hidden', width : '200px'}
    }
  }
  return (
    <>
      <div className='App'>
        <h1>Channel 1 Chat Room {userType}</h1>
        {
          joined ? 
          <>
          {
            userType == "host" ?
            <VideoCall />
            :
            <VideoCallAudience />
          }
          </>
          :
          <>
          <button onClick={()=>setJoined(true)}>Join Meeting</button>
          </>
        }


      </div>
    </>
  )
}

export default App
