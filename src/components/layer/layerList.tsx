import React, {MouseEvent} from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {Tabs, Row, Tooltip, Empty} from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import {ITemplateProps} from '@/types/componentList';
import {IComponentData} from '@/types/componentData';
import {componentDataAtom, currentElementAtom} from '@/store/atorms/global';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import styles from './index.less';
export interface Iprops {
  props: IComponentData;
}
const LayerList: React.FC<Iprops> = ({props}) => {
  const [componentData, setComponentData] = useRecoilState(componentDataAtom);
  const [currentElementId, setElementId] = useRecoilState(currentElementAtom);

  if (currentElementId) {
    const isLocked = props.isLocked;
    const isHidden = props.isHidden;
    const changeLayerHidden = (item: IComponentData) => {
      let newData = [...componentData];
      newData = newData.map((data) => {
        if (data.id === item.id) {
          const {isHidden, ...otherData} = data;
          data = {
            isHidden: !isHidden,
            ...otherData,
          };
        }
        return data;
      });
      setComponentData(newData);
    };
    // 是否锁定使其不可编辑
    const changeLayerLock = (item: IComponentData) => {
      let newData = [...componentData];
      newData = newData.map((data) => {
        if (data.id === item.id) {
          // data.
          const {isLocked, ...otherData} = data;
          data = {
            isLocked: !isLocked,
            ...otherData,
          };
        }
        return data;
      });
      setComponentData(newData);
    };
    // 设置选中项
    const selectItem = (
      e: MouseEvent<HTMLDivElement>,
      item: IComponentData,
    ) => {
      e.preventDefault();
      setElementId(item.id);
    };

    const onDragUpdate = (result: DropResult) => {};
    const onDragEnd = (result: DropResult) => {
      // console.log(result)
      const {source, destination} = result;
      if (!destination) return;
      let arr: IComponentData[] = [...componentData];
      // arr[0].
      const [remove] = arr.splice(source.index, 1);
      arr.splice(destination.index, 0, remove);
      setComponentData(arr);
    };
    return (
      <div>
        {
          <DragDropContext
            onDragEnd={(result: DropResult) => onDragEnd(result)}
            onDragUpdate={(result: DropResult) => onDragUpdate(result)}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {componentData.map((item: IComponentData, index: number) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(p, s) => (
                          <div
                            className={styles['layer-cell']}
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            onClick={(events: MouseEvent<HTMLDivElement>) =>
                              selectItem(events, item)
                            }
                          >
                            {/* // 是否可见 */}
                            <span
                              onClick={() => changeLayerHidden(item)}
                              className={styles['hidden-text']}
                            >
                              <Tooltip title={item.isHidden ? '显示' : '隐藏'}>
                                {!item.isHidden ? (
                                  <EyeOutlined />
                                ) : (
                                  <EyeInvisibleOutlined />
                                )}
                              </Tooltip>
                            </span>

                            {/* 是否禁止编辑 */}
                            <span
                              onClick={() => changeLayerLock(item)}
                              className={styles['hidden-text']}
                            >
                              <Tooltip title={item.isLocked ? '解锁' : '锁定'}>
                                {!item.isLocked ? (
                                  <UnlockOutlined />
                                ) : (
                                  <LockOutlined />
                                )}
                              </Tooltip>
                            </span>
                            <span>{item.layerName}</span>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        }
      </div>
    );
  }
  return (
    <div>
      <Empty description="请选中组件" />
    </div>
  );
};

export default LayerList;
