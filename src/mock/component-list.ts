import {v4 as uuidv4} from 'uuid';
import {IComponentList} from '@/types/componentList';
import {commonDefaultProps, textDefaultProps} from '@/types/defaultProps';

const mockComponentList: Array<IComponentList> = [
  {
    type: 1,
    typeName: '通用',
    list: [
      {
        id: uuidv4(),
        name: '容器',
        type: 'container-widget', // ContainerWidget ro container-widget
        icon: 'BuildOutlined',
        props: {
          ...commonDefaultProps,
        },
      },
      {
        id: uuidv4(),
        name: '文本',
        type: 'text-widget',
        icon: 'BuildOutlined',
        props: {
          ...textDefaultProps,
        },
      },
      {
        id: uuidv4(),
        name: '图片',
        type: 'image-widget',
        icon: 'BuildOutlined',
        props:{

        }
      },
      {
        id: uuidv4(),
        name: '列表',
        type: 'list-widget',
        icon: 'BuildOutlined',
        props:{}
      },
    ],
  },
  {
    type: 2,
    typeName: '自定义',
    list: [
      {
        id: uuidv4(),
        name: '列表',
        type: 'list',
        icon: 'BuildOutlined',
        props:{}
      },
      {
        id: uuidv4(),
        name: '列表',
        type: 'list',
        icon: 'BuildOutlined',
        props:{}
      },
      {
        id: uuidv4(),
        name: '列表',
        type: 'list',
        icon: 'BuildOutlined',
        props:{}
      },
      {
        id: uuidv4(),
        name: '列表',
        type: 'list',
        icon: 'BuildOutlined',
        props:{}
      },
    ],
  },
  {
    type: 3,
    typeName: '第三方',
    list: [
      {
        id: uuidv4(),
        name: '按钮组件',
        type: 'button',
        props: {
          block: false,
          danger: false,
          disabled: false,
          ghost: false,
          // href
          // htmlType
          // icon
          loading: false,
          shape: 'round',
          size: 'large',
          type: 'primary'
        }
      }
    ],
  },
];

export default mockComponentList;
