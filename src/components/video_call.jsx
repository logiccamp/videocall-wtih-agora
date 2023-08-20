import React, { useEffect, useState } from 'react'
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from './video_player';
import { useParams } from 'react-router-dom';

export const config = {
    appId: '84b9c536d1fe47db8eda6dd3ac0d6b0a',
    channel: 'channel1',
    token: '007eJxTYPgvt2JiZf3FQNNrBl5l/VvdnF0UeP7O7s3Ynj13ZvFS7TYFBguTJMtkU2OzFMO0VBPzlCSL1JREs5QU48RkgxSzJIPEiFMPUxoCGRly0gVYGRkgEMTnYEjOSMzLS80xZGAAAOdlIU0=', // pass in channel token if the app is in secure mode
}

const client = AgoraRTC.createClient({
    mode :'live',
    codec : 'vp9',

})

function VideoCall() {
  const params = useParams();
  const [userType, setUserType] = useState(params.type)
  const [count, setCount] = useState(1)
  const [hostId, setHostId] = useState("1.2373533564672707")
    const [users, setUsers] = useState([])
    const [localTracks, setLocalTracks] = useState(null)
    const handleUserJoined = async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("user", user)
        if (mediaType === 'video') {
          setUsers([user]);
        }
    
        if (mediaType === 'audio') {
          user.audioTrack.play()
        }
      };
      const handleUserLeft = (user) => {
        setUsers((previousUsers) =>
          previousUsers.filter((u) => u.uid !== user.uid)
        );
      };

    useEffect(() => {
        client.on('user-published', handleUserJoined);
        client.on('user-left', handleUserLeft);
        client.setClientRole( userType )
        
        var t  = null;
        client
        .join(config.appId, config.channel, config.token,  (Math.random(121212121)+1).toString())
        .then((uid) =>
          Promise.all([
            AgoraRTC.createMicrophoneAndCameraTracks(),
            uid,
          ])
        )
        .then(([tracks, uid]) => {
          console.clear()
          const [audioTrack, videoTrack] = tracks;
          setLocalTracks(tracks);
          t = tracks;
          var currentUser =  {
            uid,
            videoTrack,
            audioTrack,
          }
          setUsers([currentUser])
        
          client.publish(tracks);
        });
        return () => {
            // if(localTracks && localTracks.length > 0){

            //   for (let localTrack of localTracks) {
            //     localTrack.stop();
            //     localTrack.close();
            //   }
            // }
            // client.off('user-published', handleUserJoined);
            // client.off('user-left', handleUserLeft);
            // client.unpublish(t).then(() => client.leave());
          };
    }, [count])
    
  return (
    <div>
    <h3>Meeting</h3>
    <button onClick={()=>{
      if(count == 0){
        setCount(1)
      }else{
        setCount(0)
      }
    }}>switch to {count == 0 ? 'audience' : 'host'}</button>
    <div style={{display : 'flex', justifyContent : 'center'}}>
        <div style={{gap : '10px', display : 'grid', gridTemplateColumns: 'repeat(2, 200px)'}}>
        {
            users.map((user)=>(
                <div key={user.uid} className="">
                    <VideoPlayer user={user} />
                </div>
            ))
        }
        </div>
    </div>
    </div>

  )
}

export default VideoCall