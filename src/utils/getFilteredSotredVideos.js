const getFilteredSotredVideos = (videos, categorizedBy, sortBy) => {
  const filteredVideos = getFilteredVideos(videos, categorizedBy);
  const sortedVideos = getSortedVideos(filteredVideos, sortBy);
  return sortedVideos;
}
const getFilteredVideos = (videos, categorizedBy) => {
  if(categorizedBy === 'All'){
    return videos;
  }
  return videos.filter(video => video.category === categorizedBy);
}
const getSortedVideos = (videos, sortBy) => {
  if(!sortBy)
    return videos;
  return [...videos].sort( (videoA, videoB) => {
      return new Date(videoB.uploadedOn) - new Date(videoA.uploadedOn);
  });
}

export { getFilteredSotredVideos };