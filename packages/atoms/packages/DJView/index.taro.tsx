import { View } from "@tarojs/components";
import React, {
  CSSProperties,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
// import { ViewProps } from './type';
import myStyle from "./index.module.scss";

type TViewProps = {
  className?: any;
  style?: CSSProperties;
  onClick?: (e) => void;
  children?: any;
  id?: string;
  ref?: React.LegacyRef<any> | undefined;
};

const DJView: React.FC<TViewProps> = (props, ref) => {
  let { className, style, onClick, ...rest } = props;
  const viewRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getRef() {
      return viewRef.current;
    },
  }));

  const clickFn = (e) => {
    if (onClick) {
      onClick(e);
      e.stopPropagation();
      e.preventDefault();
    }
  };
  // console.log('className', className)
  // className = Object.prototype.toString.call(className)  === '[object Array]' ? className.join(' ') : className;

  return (
    <View
      ref={viewRef}
      className={`${myStyle.defaultView} ${className}`}
      style={style}
      {...rest}
      onClick={clickFn}
    >
      {props.children}
    </View>
  );
};
export default forwardRef(DJView as any);
