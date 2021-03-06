import { ISearchItem } from '../api/youtube-types'
import { useYouTubeSearch } from '../contexts/search.context'
import { generateClass } from '../utils/utils'
import Snippet from './Snippet'
import SnippetSkeleton from './SnippetSkeleton'

const Contents = () => {
  const { searchQuery, setSelectedVideo, isPlayerActive } = useYouTubeSearch()

  const choiceHandler = (itemData: ISearchItem) => {
    setSelectedVideo(itemData)
  }

  if (searchQuery.isError)
    return <div className='error-message'>Reached daily limit for search requests.</div>

  return (
    <div className={generateClass('contents', { isPlayer: isPlayerActive })} data-testid='contents'>
      {searchQuery.isFetching
        ? Array.from(new Array(6)).map((_, index) => (
            <SnippetSkeleton key={`skeleton-${index}`} isPlayer={isPlayerActive} />
          ))
        : searchQuery?.data?.items.map(item => (
            <Snippet
              key={item.id.videoId || item.id.channelId}
              id={item.id}
              etag={item.etag}
              kind={item.kind}
              snippet={item.snippet}
              onClick={choiceHandler}
              isPlayer={isPlayerActive}
            />
          ))}
    </div>
  )
}

export default Contents
