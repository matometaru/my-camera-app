export function getMediaTrackSettings(mediaStream: MediaStream) {
  const track = mediaStream.getVideoTracks()[0]
  return track.getSettings()
}
