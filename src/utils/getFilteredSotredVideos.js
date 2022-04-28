const getFilteredSotredVideos = (videos, searchKey, categorizedBy, sortBy) => {
  const foundBysearchVideos = getSeachedVideos(videos, searchKey);
  const filteredVideos = getFilteredVideos(foundBysearchVideos, categorizedBy);
  const sortedVideos = getSortedVideos(filteredVideos, sortBy);
  return sortedVideos;
}

const getSeachedVideos = (videos, searchKey) => {
  if(searchKey==='')
    return videos;
  return videos.filter(video => video.title.toLowerCase().includes(searchKey.toLowerCase()));
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