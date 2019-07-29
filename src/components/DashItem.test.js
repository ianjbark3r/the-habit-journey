import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { findByTestAttr } from '../../utils/findByTestAttr';

import DashItem from './DashItem';

configure({adapter: new Adapter()});

const setUp = (props={}) => {
  const component = shallow(<DashItem {...props} />);
  return component;
}

describe('Dashboard Items', () => {
  // Setup
  let component

  beforeEach(() => {
    component = setUp();
  })

  it('Should render a parent div', () => {
    const dashItemDiv = findByTestAttr(component, 'dashItemDiv');
    expect(dashItemDiv.length).toBe(1);   
  });

  it('Should render a "button"', () => {
    const dashItemButton = findByTestAttr(component, 'dashItemButton');
    expect(dashItemButton.length).toBe(1);   
  });
});