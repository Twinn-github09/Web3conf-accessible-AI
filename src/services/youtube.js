import axios from 'axios';

const YOUTUBE_API_KEY = 'AIzaSyBHBy0k3ZxyPK9epHqUosmrOfWRfQPb-4A'; // Replace with your actual API key
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
export const searchYouTubeVideos = async (query) => {
  try {
    console.log('Search Query:', query); // Debug log

    const response = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        part: 'id',
        maxResults: 20,
        q: query,
        type: 'video',
        key: YOUTUBE_API_KEY,
      },
    });

    console.log('YouTube Search Response:', response.data); // Debug log
    const videoIds = response.data.items.map((item) => item.id.videoId).join(',');
    console.log('Mapped Video IDs:', videoIds); // Debug log

    if (!videoIds) return [];

    const videoDetailsResponse = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoIds,
        key: YOUTUBE_API_KEY,
      },
    });

    console.log('Video Details Response:', videoDetailsResponse.data); // Debug log
    const videos = videoDetailsResponse.data.items;

    const filteredVideos = videos.filter((video) => {
      const duration = video.contentDetails.duration;
      const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
      const minutes = match && match[1] ? parseInt(match[1], 10) : 0;
      const seconds = match && match[2] ? parseInt(match[2], 10) : 0;
      const totalSeconds = minutes * 60 + seconds;

      const views = parseInt(video.statistics.viewCount, 10) || 0;

      return totalSeconds > 60 && views > 1000;
    });

    console.log('Filtered Videos:', filteredVideos); // Debug log
    return filteredVideos;
  } catch (error) {
    console.error('Error searching YouTube:', error);
    throw error;
  }
};
