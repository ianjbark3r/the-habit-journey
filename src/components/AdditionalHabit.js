import React from 'react';

const additionalHabit = (item, lastItem, index, firstHabit) => {
  if (index === 0) {
    return (
      <li
        style={{ listStylePosition:"outside!important" }} 
        className="mb-3" 
        key={index}
      >
        After I {firstHabit}, I will <span style={{ fontWeight:"bold" }} className="lead">{item}</span>
      </li>
    )
  } else {
    return (
      <li
        style={{ listStylePosition:"outside!important" }} 
        className="mb-3" 
        key={index}
      >
        After I {lastItem}, I will <span style={{ fontWeight:"bold" }} className="lead">{item}</span>
      </li>
    )
  }
}

export default additionalHabit;