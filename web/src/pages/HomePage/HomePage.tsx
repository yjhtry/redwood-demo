import { Metadata } from '@redwoodjs/web'

import ArticleCell from 'src/components/ArticlesCell'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <ArticleCell />
    </>
  )
}

export default HomePage
