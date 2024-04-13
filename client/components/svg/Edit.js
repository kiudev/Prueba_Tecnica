import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { colorPalette } from "../../colorPalette";

export default function Edit(props) {
   return (
      <Svg
         xmlns="http://www.w3.org/2000/svg"
         width={52}
         height={52}
         viewBox="0 0 27 22"
         {...props}
      >
         <G
            fill={colorPalette[3]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
         >
            <Path
               strokeDasharray={20}
               strokeDashoffset={20}
               d="M3 21h18"
            ></Path>
            <Path
               strokeDasharray={44}
               strokeDashoffset={44}
               d="M7 17v-4L17 3l4 4-10 10H7"
            ></Path>
            <Path strokeDasharray={8} strokeDashoffset={8} d="m14 6 4 4"></Path>
         </G>
      </Svg>
   );
}
