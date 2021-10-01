import { memo, createElement } from 'react';
import { TextComponentProps, textDefaultProps, textStylePropNames } from '@/types/defaultProps';

// props 属性待整合
const TextWidget = (props: TextComponentProps) => {
    let { tag, text, ...restProps } = props;
    if (!tag) {
        tag = 'div';
    }
    // style 需要去除 'actionType','url','text', "tag" 属性
    return createElement(
        tag,
        {
            style: { ...restProps },
        },
        text,
    );
};
TextWidget.defaultProps = {
    textDefaultProps,
};
export default memo(TextWidget);
