import { mapValues, without } from 'lodash-es';
export interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  backgroundColor: string;
  // position and x,y
  // position: string;
  // left: string;
  // top: string;
  // right: string;
}
export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '100px',
  width: '318px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: '1',
  backgroundColor: 'green',
  // position and x,y
  // position: 'relative'
  // left: '0',
  // top: '0',
  // right: '0'
};
export interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: number;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  left: string;
  top: string
}

export interface ButtonComponentProps {
  block: boolean;
  danger: boolean;
  disabled: boolean;
  ghost: boolean;
  // href
  // htmlType
  // icon
  loading: boolean;
  shape: 'circle' | 'round';
  size: 'large' | 'middle' | 'small',
  type: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
}

export const ButtonDefaultProps: ButtonComponentProps = {
  block: false,
  danger: false,
  disabled: false,
  ghost: false,
  loading: false,
  shape: 'round',
  size: 'large',
  type: 'primary'
}

export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  ...commonDefaultProps,
  height: '100px',
  width: '100%',
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 400,
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  left: '0px',
  top: '0px',
  // position: 'absolute'
};

export interface ImageComponentProps extends CommonComponentProps {
  src: string;
}
export const imageDefaultProps: ImageComponentProps = {
  src: 'test.url',
  ...commonDefaultProps,
};
export const textStylePropNames = without(
  Object.keys(textDefaultProps),
  'actionType',
  'url',
  'text',
);
export const transformToComponentProps = (props: TextComponentProps) => {
  return mapValues(props, (item) => {
    return {
      type: item.constructor as StringConstructor,
      default: item,
    };
  });
};
