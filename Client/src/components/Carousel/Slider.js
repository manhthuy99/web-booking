import React from 'react';
import { Carousel } from 'antd';

const Slider = (props) => {
  const data = props.data;
  console.log(data)
  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  return (
    <>
      <Carousel afterChange={onChange}>
        {data.map((value) => {
          return <div key={value}><img src={value} alt='example'/></div>
        })}
      </Carousel>,
    </>
  )
}

export default Slider