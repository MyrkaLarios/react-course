import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

function Hello(props) {
  return <h1>Hello at {props.now} </h1>;
}

const moment = new Date(1588946400000);

describe('When testing a component directly', () => {
  let result;
  beforeAll(() => {
    result = Hello({ now: moment.toISOString() });
  });
  it('return a value', () => {
    expect(result).not.toBeNull();
  });
  it('return a h1 element', () => {
    expect(result.type).toBe('h1');
  });

  it('has a children', () => {
    expect(result.props.children).toBeTruthy();
  });
});

describe('When testing with ReactDOM', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Hello now={moment.toISOString()} />, div);
  });
});

Enzyme.configure({ adapter: new Adapter() });

describe('When testing with enzyme', () => {
  it('renders h1 component', () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.find('h1').length).toBe(1);
  });

  it('contains hello at specific hour', () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(
      wrapper.contains(<h1>Hello at 2020-05-08T14:00:00:000Z</h1>)
    ).toBeTruthy();
  });
});
