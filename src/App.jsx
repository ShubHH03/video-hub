import { useEffect, useState } from 'react';

function App() {

  const [videos, setVideos] = useState([]);

	useEffect(() => {
		const fetchVideos = async () => {
			try {

        const response = await fetch('https://api.freeapi.app/api/v1/public/youtube/videos')
        const data = await response.json();
        console.log('Fetched videos:', data.data.data[0].items.snippet);
        const videoData = data.data.data
        setVideos(videoData);

			} catch (error) {
				console.log('error fetching videos:', error);
			}
		};
		fetchVideos();
	}, []);
	return (
		<>
			<h1>Video Hub</h1>
      <div>
        {videos.map((video) => (
          <div key={video.items.id} >
            <h2>{video.items.snippet.title}</h2>
            <iframe 
              width="560" 
              height="315" 
              src={`https://www.youtube.com/embed/${video.items.id}`} 
              title={video.items.snippet.title} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
		</>
	);
}

export default App;
