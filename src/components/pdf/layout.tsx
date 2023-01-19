import { View } from "@react-pdf/renderer";

export const SpaceDivider = ({ heightValue, hasBorder } : { heightValue: number, hasBorder: boolean}) => (
    <View
        style={{
            height: heightValue,
            borderBottom: hasBorder ? '1px solid black' : 'none',
        }}
    ></View>
);