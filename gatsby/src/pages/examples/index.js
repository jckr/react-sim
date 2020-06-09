import React from 'react';
import { Flex, Text } from 'rebass';

import examples from '../../components/examples/';

const ExampleCard = ({ name, title }) => (
  <Flex sx={{ height: 332, width: 332, mr: 2, mb: 2, position: 'relative' }}>
    <Text sx={{ position: 'absolute', bottom: 2, left: 2 }}>{title}</Text>
  </Flex>
);

const Examples = props => {
  return (
    <Flex sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {Object.entries(examples).map(([name, title]) => (
        <ExampleCard name={name} title={title} key={name} />
      ))}
    </Flex>
  );
};

export default Examples;
