import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './98196-loading-teal-dots.json';
import cl from './Loader.module.scss';
const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
      <div className={cl.wrapper}>
        <div className={cl.loaderwrapper}>
            <Lottie options={defaultOptions}
              height={100} width={200} />
          </div>
        </div>
    );
};

export default Loader;