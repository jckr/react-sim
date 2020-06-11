import React, { useState } from 'react';
import { Flex, Link, Text } from 'rebass';
import Image, { camel } from '../../components/image';
import examples, { gifs } from '../../components/examples/';

const ExampleCard = ({ name, title }) => {
  const [hover, setHover] = useState(false);
  return (
    <Flex
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      sx={{
        width: 342,
        p: 1,
        border: '1px solid black',
        m: 1,
        position: 'relative',
      }}
    >
      <Link href={`examples/${name}`}>
        {hover ? (
          <img src={gifs[name]} alt={name} />
        ) : (
          <Image name={name} fixed />
        )}
        <Text
          sx={{
            fontSize: 4,
            fontWeight: 'bold',
          }}
        >
          {title}
        </Text>
      </Link>
    </Flex>
  );
};

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
