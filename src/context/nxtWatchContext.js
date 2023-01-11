import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkTheme: false,
  searchInput: '',
  isShownBanner: true,
  removeBanner: () => {},
  toggleTheme: () => {},
  changeSearchInput: () => {},
})

export default NxtWatchContext
