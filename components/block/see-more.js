import React, { useState } from 'react'
import Visible from './visible'

const SeeMore = ({ text, length }) => {
  const [selectShowMore, setSelectShowMore] = useState(false)
  return (
    <div>
      {selectShowMore ? <div>
        {text}
        <div
          onClick={() => setSelectShowMore(!selectShowMore)}
          className='text-primary'>see less</div>
      </div> :
        <span>
          {text.slice(0, parseInt(length, 10))}
          <Visible when={length > 100}>
            ...<div
              onClick={() => setSelectShowMore(!selectShowMore)}
              className='text-primary'>see more</div>
          </Visible>
        </span>
      }
    </div>
  )
}

export default SeeMore
