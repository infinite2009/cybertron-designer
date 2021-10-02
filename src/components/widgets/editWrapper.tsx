import React, {MouseEvent, useRef,useEffect } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useRecoilState} from 'recoil';
// import { IComponentData } from '@/types/componentData';
import {currentElementAtom} from '@/store/atorms/global';
import styles from './index.less';
type ResizeDirection =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
interface OriginalPositions {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface IProps {
  updatePosition?: Function;
  id: string;
  width?: string;
  height?: string;
}
const EditWrapper: React.FC<IProps> = (props) => {
  let [currentElement, setElementId] = useRecoilState(currentElementAtom);
  // let [componentData, setComponentData] = useRecoilState<IComponentData[]>(componentDataAtom)
  // let result = componentData.find(v=>v.id===currentElement)
  // console.log('result', result)
  const editWrapperDiv = useRef<HTMLDivElement | null>(null);
  const gap = {
    x: 0,
    y: 0,
  };
  let isMoving = false;
  const onItemClick = () => {
    // alert(1)
    currentElement = props.id
    setElementId(props.id);
  };

  const caculateMovePosition = (e: globalThis.MouseEvent) => {
    const container = document.getElementById('canvas-area') as HTMLElement;
    const left = e.clientX - gap.x - container.offsetLeft;
    const top =
      e.clientY -
      gap.y -
      container.offsetTop +
      container.scrollTop +
      document.documentElement.scrollTop;
    return {
      left,
      top,
    };
  };

  const startMove = (e: MouseEvent) => {
    // console.log(e)
    // const canvasArea = document.getElementById('canvas-area')
    if (editWrapperDiv.current) {
      const {left, top} = editWrapperDiv.current.getBoundingClientRect();
      // console.log(e.clientX, e.clientY, )
      gap.x = e.clientX - left;
      gap.y = e.clientY - top;
    }
    // console.log(canvasArea)
    const handleMove = (e: globalThis.MouseEvent) => {
      const {left, top} = caculateMovePosition(e);
      isMoving = true;
      if (editWrapperDiv.current) {
        // console.log(gap.x, gap.y)
        let dom = editWrapperDiv.current.childNodes[0] as HTMLElement
        dom.style.top = top + 'px';
        dom.style.left = left + 'px';
        editWrapperDiv.current.style.top = top + 'px';
        editWrapperDiv.current.style.left = left + 'px';
      }
    };

    const handleMouseUp = (e: globalThis.MouseEvent) => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (isMoving) {
        const {left, top} = caculateMovePosition(e);
        isMoving = false;
        if (props.updatePosition) {
          const {width,height} = editWrapperDiv.current.style
          props.updatePosition({id: props.id, left, top, width, height});
        }
      }
    };
    document.addEventListener('mousemove', handleMove);

    document.addEventListener('mouseup', handleMouseUp);
  };

  const caculateSize = (
    direction: ResizeDirection,
    e: globalThis.MouseEvent,
    positions: OriginalPositions,
  ) => {
    const {clientX, clientY} = e;
    const {left, right, top, bottom} = positions;
    const container = document.getElementById('canvas-area') as HTMLElement;
    const rightWidth = clientX - left;
    const leftWidth = right - clientX;
    const bottomHeight = clientY - top;
    const topHeight = bottom - clientY;
    const topOffset =
      clientY -
      container.offsetTop +
      container.scrollTop +
      document.documentElement.scrollTop;
    const leftOffset = clientX - container.offsetLeft;
    switch (direction) {
      case 'top-left':
        return {
          width: leftWidth,
          height: topHeight,
          top: topOffset,
          left: leftOffset,
        };
      case 'top-right':
        return {
          width: rightWidth,
          height: topHeight,
          top: topOffset,
        };
      case 'bottom-left':
        return {
          width: leftWidth,
          height: bottomHeight,
          left: leftOffset,
        };
      case 'bottom-right':
        return {
          width: rightWidth,
          height: bottomHeight,
        };
      default:
        return {};
    }
  };

  const startResize = (e: MouseEvent, direction: ResizeDirection) => {
    e.stopPropagation();
    const currentElement = editWrapperDiv.current;
    const {left, right, top, bottom} = currentElement.getBoundingClientRect();
    const handleMove = (e: globalThis.MouseEvent) => {
      const size = caculateSize(direction, e, {left, right, top, bottom});
      const {style} = currentElement;
      let dom = editWrapperDiv.current.childNodes[0] as HTMLElement
      if (size) {
        style.width = size.width + 'px';
        style.height = size.height + 'px';
        dom.style.width = size.width + 'px';
        dom.style.height = size.height + 'px';
        if (size.left) {
          style.left = size.left + 'px';
          dom.style.left = size.left + 'px';
        }
        if (size.top) {
          style.top = size.top + 'px';
          dom.style.top = size.top + 'px';
        }
      }
    };

    const handleMouseUp = (e: globalThis.MouseEvent) => {
      document.removeEventListener('mousemove', handleMove);
      const size = caculateSize(direction, e, {left, right, top, bottom});
      if(props.updatePosition) {
        props.updatePosition({...size, id: props.id})
      }
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  return (
    <div
      ref={editWrapperDiv}
      id={'wrapper'+props.id}
      className={classNames(
        styles['edit-wrapper'],
        currentElement === props.id ? styles['active'] : '',
        'edit-wrapper-box'
      )}
      style={{width: props.width,height: props.height}}
      onClick={onItemClick}
      onMouseDown={startMove}
    >
      {props.children}
      <div className={styles.resizers}>
        <div
          className={classNames(styles.resizer, styles['top-left'])}
          onMouseDown={(e: MouseEvent) => {
            startResize(e, 'top-left');
          }}
        ></div>
        <div
          className={classNames(styles.resizer, styles['top-right'])}
          onMouseDown={(e: MouseEvent) => {
            startResize(e, 'top-right');
          }}
        ></div>
        <div
          className={classNames(styles.resizer, styles['bottom-left'])}
          onMouseDown={(e: MouseEvent) => {
            startResize(e, 'bottom-left');
          }}
        ></div>
        <div
          className={classNames(styles.resizer, styles['bottom-right'])}
          onMouseDown={(e: MouseEvent) => {
            startResize(e, 'bottom-right');
          }}
        ></div>
      </div>
    </div>
  );
};

export default EditWrapper;
