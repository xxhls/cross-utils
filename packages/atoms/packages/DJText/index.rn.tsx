import React, { memo } from "react";
import { Text, Platform, TextStyle } from "react-native";

type TDJText = {
  style?: TextStyle | string;
  [key: string]: any;
};

function DJText(props: TDJText) {
  const {
    adjustsFontSizeToFit = false,
    className = {},
    style,
    children,
    numberOfLines,
    includeFontPadding = false,
    ellipsizeMode,
    allowFontScaling = false,
    onPress,
  } = props;

  //space抹平，获取children中空格并替换为${space};
  // const regex = /\s/ig;
  // const changeChildren = space && typeof(children) == 'string' ? children.replaceAll(regex, `&${space};`) : children;
  //style 比 className 的优先级要高

  // console.log('className',className,'style',style);

  return (
    <Text
      numberOfLines={numberOfLines ?? 1}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      ellipsizeMode={ellipsizeMode}
      allowFontScaling={allowFontScaling}
      style={[
        { includeFontPadding },
        Platform.OS == "android"
          ? { fontFamily: "Helvetica" }
          : { fontFamily: "PingFangSC-Regular" },
        className,
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </Text>
  );
}

export default memo(DJText);
