import React, { Fragment } from 'react';
import { Row, Empty } from 'antd';
import { useRecoilState } from 'recoil';
import { reduce } from 'lodash-es';
import { mapPropsToForms, FormProps, PropToForm } from '@/types/propsMap';
import { TextComponentProps } from '@/types/defaultProps';
import { componentDataAtom, currentElementAtom, historyAtom } from '@/store/atorms/global';
import { firstToUpper } from '@/util';
import { v4 as uuidv4 } from 'uuid';
import { IProps } from './editGroup';
import styles from './index.less';
import {cloneDeep} from 'lodash-es'
const Index: React.FC<IProps> = (props) => {
  const [componentData, setComponentData] = useRecoilState(componentDataAtom);
  const [currentElementId, setElementId] = useRecoilState(currentElementAtom);
  const [historyList,setHistory] = useRecoilState(historyAtom)
  if (props.props) {
    const propMap = props.props;
    const isLocked = propMap?.isLocked;
    const isHidden = propMap?.isHidden;
    const propChange = ({ key, value }) => {
      if(key==='left' || key==='top') {
        const wrapperDiv = document.getElementById('wrapper' + currentElementId)  as HTMLElement
        key==='left' && (wrapperDiv.style.left = value)
        key==='top' && (wrapperDiv.style.top = value)
      }

      let newData = [...componentData];
      // TODO 后续抽离出去、可能还需要递归去找、现在先默认就是一层
      newData = newData.map((data) => {
        if (data.id === currentElementId) {
          const newData = {
            ...data,
            props: {
              ...data.props,
              [key]: value,
            },
          };
          console.log(newData)
          // alert(1)
          setHistory([...historyList, {
            type: 'modify',
            id: uuidv4(),
            componentId: data.id,
            data: {
              oldValue: cloneDeep(data)
            }
          }])
          return newData;
        }
        return data;
      });
      setComponentData(newData);
    };

    const finalProps = reduce(
      propMap,
      (result, value, key) => {
        const newKey = key as keyof TextComponentProps;
        
        const item = mapPropsToForms[newKey] as PropToForm;

        if (item) {
          const {
            valueProp = 'value',
            eventName = 'change',
            initalTransform,
            afterTransform,
          } = item;
          const newItem: FormProps = {
            ...item,
            valueProp, // 自定义值的名称
            eventName, // 自定义事件名称
            value: initalTransform ? initalTransform(value) : value,
            events: {
              // eventName:change/foce 等 需要拼接成 onChange
              [`on${firstToUpper(eventName)}`]: (e: unknown) => {
                propChange({
                  key,
                  value: afterTransform ? afterTransform(e) : e,
                });
              },
            },
          };
          result[newKey] = newItem;
        }
        return result;
      },
      {} as FormProps,
    );

    return (
      <>
        {!isLocked ? (
          finalProps &&
          Object.keys(finalProps).map((key) => {
            const values = finalProps[key];
            const {
              component: Component,
              subComponent: SubComponent,
              options,
              valueProp,
              value,
              extraProps,
              events,
            } = values;
            const domProps = {
              [valueProp]: value,
              ...extraProps,
              ...events,
            };
            return (
              <Fragment key={key}>
                {Component && (
                  <Row className={styles['prop-item']}>
                    <label className={styles.label}>{values.text}</label>
                    <Component {...domProps}>
                      {options && options.length
                        ? options.map((option) => {
                          return (
                            <SubComponent
                              value={option.value}
                              key={option.value}
                            >
                              {option.text}
                            </SubComponent>
                          );
                        })
                        : null}
                    </Component>
                  </Row>
                )}
              </Fragment>
            );
          })
        ) : (
          <Empty
            description={isHidden ? '已隐藏，暂无法编辑' : '已锁定，暂无法编辑'}
          />
        )}
      </>
    );
  }
  return null;
};

export default Index;
