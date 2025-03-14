import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { RNViewProps } from "./type";
// import { transformRNStyle } from '../common/utils';

const DJView: React.FC<RNViewProps> = (props) => {
  const { className, style = {}, onClick, onLayout } = props;
  // let styleObj = transformRNStyle(style);
  const styles = StyleSheet.flatten([className, style as any]);
  if (!onClick) {
    return (
      <View style={[myStyle.defaultView, styles]} onLayout={onLayout}>
        {props.children}
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={[myStyle.defaultView, styles]} onLayout={onLayout}>
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
};
const myStyle = StyleSheet.create({
  defaultView: {
    display: "flex",
  },
});
export default DJView;
