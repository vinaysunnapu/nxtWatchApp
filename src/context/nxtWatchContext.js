import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkTheme: false,
  searchInput: '',
  isShownBanner: true,
  removeBanner: () => {},
  toggleTheme: () => {},
  changeSearchInput: () => {},
  savedVideos: false,
  addVideos: () => {},
})

export default NxtWatchContext
