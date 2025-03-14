import { CSSProperties } from "react";
import { ViewStyle } from "react-native";
// export interface ViewProps {
//     className?: any;
//     style?: CSSProperties;
//     onClick?: (e)=>void;
//     onLayout?: (e)=>void;
//     children?: any;
//     id?: string,
//     ref?: React.LegacyRef<any> | undefined
// }
export interface RNViewProps {
  className?: any;
  style?: CSSProperties | CSSProperties[] | string | ViewStyle;
  onClick?: (e) => void;
  onLayout?: (e) => void;
  children?: any;
  id?: string;
  ref?: React.LegacyRef<any> | undefined;
}
