import { Text } from "@tarojs/components";
import React, { memo } from "react";
import styles from "./index.module.scss";

function DJText(props) {
  const {
    selectable,
    userSelect,
    space,
    decode,
    numberOfLines,
    className,
    style,
    children,
    onPress,
  } = props || {};
  /**这里处理下一行/两行/三行/多行的展示 */
  const customClass = styles[`clamp${numberOfLines}`]
    ? styles[`clamp${numberOfLines}`]
    : "";

  return (
    <Text
      style={style}
      className={`${className} ${customClass} ${styles.defaultFont}`}
      selectable={selectable}
      userSelect={userSelect}
      space={space}
      decode={decode}
      onClick={onPress}
    >
      {children}
    </Text>
  );
}
export default memo(DJText);
