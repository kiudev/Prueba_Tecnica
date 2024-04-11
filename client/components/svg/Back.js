import React from "react";
import Svg, { Path } from "react-native-svg"

export default function Back(props) {
   return (
      <Svg
         xmlns="http://www.w3.org/2000/svg"
         width={32}
         height={32}
         viewBox="0 0 20 20"
         {...props}
      >
         <Path fill="#454545" d="M.75 10 6 4.5V8h13v4H6v3.5z" />
      </Svg>
   );
}