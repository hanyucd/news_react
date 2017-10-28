import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newsContainer';

class PCIndex extends React.Component {
  render() {
    return (
      <div>
        <PCHeader />
        <PCNewsContainer />
        <PCFooter />
      </div>
    );
  }
}

export default PCIndex;
