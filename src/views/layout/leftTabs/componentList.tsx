import React, { FC } from 'react';
import { ITemplateProps } from '@/types/componentList';
import { useRecoilState } from 'recoil';
import { componentDataAtom, historyAtom, HistoryProps } from '@/store/atorms/global';
import { textDefaultProps, ButtonDefaultProps} from "@/types/defaultProps"
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash-es'
import styles from './index.less';
interface IProps {
  list: ITemplateProps[];
}

const ComponentList: FC<IProps> = (props) => {
  const [componentData, setComponentData] = useRecoilState(componentDataAtom);
  const [historyList, setHistory] = useRecoilState(historyAtom)
  const addComponentData = (item: ITemplateProps) => {

    let newcomponentData = [...componentData];
    // console.log('item.type', item.type)
    const componentProps = item.type === 'button' ? ButtonDefaultProps : textDefaultProps
    console.log('componentProps', componentProps)
    const newItem: ITemplateProps = {
      id: uuidv4(),
      name: item.name,
      type: item.type,
      layerName: `图层${newcomponentData.length+1}`,
      props: {
        ...componentProps
      },
    };
    newcomponentData.push(newItem);

    const newHistoryList:HistoryProps[] = [
      ...historyList,
      {
          id: uuidv4(),
          componentId: newItem.id,
          type: 'add',
          data: cloneDeep(newItem),
      }
    ]
    setHistory(newHistoryList)

    setComponentData(newcomponentData);
  };
  return (
    <div className={styles.componentList}>
      {props.list.map((item: ITemplateProps) => (
        <div
          key={item.id}
          className={styles.name}
          onClick={() => addComponentData(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
export default ComponentList;
