import React, { MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import { Tooltip, Empty } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import LnlineEdit from '@/components/lnlineEdit'
import { IComponentData } from '@/types/componentData';
import { componentDataAtom } from '@/store/atorms/global';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import styles from './index.less';

export interface Iprops {
  props: IComponentData;
  currentElementId: string;
  setCurrentElementId: (id: string) => void
  updateComponent: (key: string, value: any, isRoot?: boolean) => void
}
const LayerList: React.FC<Iprops> = ({ props, currentElementId, setCurrentElementId, updateComponent }) => {
  const [componentData, setComponentData] = useRecoilState(componentDataAtom);

  if (currentElementId) {
    const changeLayerHidden = (item: IComponentData) => {
      let newData = [...componentData];
      newData = newData.map((data) => {
        if (data.id === item.id) {
          const { isHidden, ...otherData } = data;
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
          const { isLocked, ...otherData } = data;
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
    const selectItem = (e: MouseEvent<HTMLDivElement>, item: IComponentData) => {
      e.preventDefault();
      setCurrentElementId(item.id);
    };

    const onDragUpdate = (result: DropResult) => { };
    const onDragEnd = (result: DropResult) => {
      // console.log(result)
      const { source, destination } = result;
      if (!destination) return;
      let arr: IComponentData[] = [...componentData];
      // arr[0].
      const [remove] = arr.splice(source.index, 1);
      arr.splice(destination.index, 0, remove);
      setComponentData(arr);
    };

    // 修改 layname
    const handleChange = (value) => {
      console.log(value);
      updateComponent && updateComponent("layerName", value, true)
    }

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
                        {(p) => (
                          <div
                            className={styles['layer-cell']}
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            style={{ border: currentElementId === item.id ? "1px solid #1890ff" : '' }}
                            onClick={(events: MouseEvent<HTMLDivElement>) =>
                              selectItem(events, item)
                            }
                          >
                            {/* 是否可见 */}
                            <span
                              onClick={() => changeLayerHidden(item)}
                              className={styles['hidden-text']}
                            >
                              <Tooltip title={item.isHidden ? '显示' : '隐藏'}>
                                {!item.isHidden ? (
                                  <EyeOutlined className={styles.icon} />
                                ) : (
                                  <EyeInvisibleOutlined className={styles.icon} />
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
                                  <UnlockOutlined className={styles.icon} />
                                ) : (
                                  <LockOutlined className={styles.icon} />
                                )}
                              </Tooltip>
                            </span>
                            <LnlineEdit value={item.layerName} onChange={handleChange} />
                          </div>
                        )
                        }
                      </Draggable>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        }
      </div >
    );
  }
  return (
    <div>
      <Empty description="请选中组件" />
    </div>
  );
};

export default LayerList;
