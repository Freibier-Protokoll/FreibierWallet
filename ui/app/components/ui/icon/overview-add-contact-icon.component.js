import React from 'react'
import PropTypes from 'prop-types'

export default function AddContactIcon({
  width = '40',
  height = '40',
  fill = 'white',
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 10c0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8s-8-3.582-8-8zM24 20h-16c-4.418 0-8 3.582-8 8v2h32v-2c0-4.418-3.582-8-8-8z"
        fill={fill}
      />
    </svg>
  )
}

AddContactIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
}
