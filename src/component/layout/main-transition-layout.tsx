import React, { useState, useRef, useCallback } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { CaretRightOutlined } from '@ant-design/icons';

type MainTransitionLayoutProps = {
  children: any;
};

const MAIN_LAYOUT_BOX_OPEN = 'MAIN_LAYOUT_BOX_OPEN';
const MAIN_LAYOUT_BOX_CLOSE = 'MAIN_LAYOUT_BOX_CLOSE';

export const MainTransitionLayout = (props: MainTransitionLayoutProps) => {
  const { children } = props;
  const layoutRef = useRef(MAIN_LAYOUT_BOX_CLOSE);

  const [layouts, setLayouts] = useState([
    { key: 'JDCUser', width: 300 },
    { key: 'JDCOptions', width: 0, opacity: 0 },
  ]);

  const closeBox = () => {
    setLayouts([
      { key: 'JDCUser', width: 300 },
      { key: 'JDCOptions', width: 0, opacity: 0 },
    ]);
    layoutRef.current = MAIN_LAYOUT_BOX_CLOSE;
  };

  const openBox = () => {
    setLayouts([
      { key: 'JDCUser', width: 300 },
      { key: 'JDCOptions', width: 400, opacity: 1 },
    ]);
    layoutRef.current = MAIN_LAYOUT_BOX_OPEN;
  };

  const toogleBox = useCallback(() => {
    if (layoutRef.current === MAIN_LAYOUT_BOX_OPEN) {
      return closeBox();
    }
    openBox();
  }, [layoutRef.current]);

  return (
    <TransitionMotion
      styles={layouts.map(item => ({
        key: item.key,
        style: { width: spring(item.width), opacity: spring(item.opacity) },
      }))}
    >
      {interpolatedStyles => {
        return (
          <div className='main-layout'>
            {children.map((child, index) => {
              const currentStyle = interpolatedStyles[index] ?? { style: {} };
              return (
                <div key={index} style={{ ...currentStyle.style }}>
                  {child}
                </div>
              );
            })}

            <div className='calculator-options-button'>
              <div onClick={toogleBox}>
                <CaretRightOutlined />
                高级选项
              </div>
            </div>
          </div>
        );
      }}
    </TransitionMotion>
  );
};
