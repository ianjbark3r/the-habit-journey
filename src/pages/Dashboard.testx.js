import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { findByTestAttr } from '../../utils/findByTestAttr';

import Dashboard from './Dashboard';

configure({adapter: new Adapter()});

const setUp = (props={}) => {
  const component = shallow(<Dashboard {...props} />);
  return component;
}

describe('Dashboard', () => {
  
  describe('When loading', () => {
    let item;

    beforeEach(() => {
      const props = {
        isLoading: true
      };
      item = setUp(props);
    })

    it('Should render a spinner', () => {
      const spinner = findByTestAttr(item, 'spinner');
      expect(spinner.length).toBe(1);
    })
  })

  describe('When loaded', () => {
    let item;

    beforeEach(() => {
      item = setUp();
    })

    it('Should render the dashboard', () => {
      const dashboard = findByTestAttr(item, 'dashboard');
      expect(dashboard.length).toBe(1);
    })
  })
});