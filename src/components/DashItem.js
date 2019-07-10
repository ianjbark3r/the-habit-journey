import React from 'react';
import { Link } from 'react-router-dom';

// Import state store
import store from '../Store';

// Import Redux actions
import loadStack from '../actions/loadStack';
import stackReceive from '../actions/stackReceive';
import stackRequest from '../actions/stackRequest';

const handleClick = (e, id) => {
  store.dispatch(stackRequest());

  store.dispatch(loadStack(store.getState().stacks.storedStacks.find(obj => {
      return obj.id === id;
    })
  ));

  store.dispatch(stackReceive());
}

const dashItem = (props, index) => {
  return (
    <div className="mb-2" key={index}>
      <Link key={index} to='/stack'>
        <p 
          style={{
            borderColor:"#FFCC00",
            borderStyle:"solid",
            borderRadius:"100px",
            borderWidth:"thin",
            color:"black", 
            paddingLeft:"20px",
            textAlign:"center"
          }} 
          className="py-2 shadow-sm" 
          key={index} 
          onClick={e => handleClick(e, props.id)}
        >
          {props.name}
        </p>
      </Link>
    </div>
  )
}

export default dashItem;