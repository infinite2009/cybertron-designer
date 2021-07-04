import React, { FC } from 'react';
import { ITemplateProps } from '@/types/componentList';
import { useRecoilState } from 'recoil';
import { componentDataAtom } from '@/store/atorms/global';
import { textDefaultProps} from "@/types/defaultProps"
import { v4 as uuidv4 } from 'uuid';

import styles from './index.less';
interface IProps {
  list: ITemplateProps[];
}

const ComponentList: FC<IProps> = (props) => {
  const [componentData, setComponentData] = useRecoilState(componentDataAtom);
  const addComponentData = (item: ITemplateProps) => {
    const styles = item.props;
    let newcomponentData = [...componentData];
    const newItem: ITemplateProps = {
      id: uuidv4(),
      name: item.name,
      type: item.type,
      layerName: `图层${newcomponentData.length+1}`,
      props: {
        ...textDefaultProps
      },
    };
    newcomponentData.push(newItem);
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
