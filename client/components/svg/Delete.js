import React from "react";
import Svg, { Path } from "react-native-svg";
import { colorPalette } from "../../colorPalette";

export default function Delete(props) {
   return (
      <Svg
         xmlns="http://www.w3.org/2000/svg"
         width={52}
         height={52}
         viewBox="0 0 24 24"
         {...props}
      >
         <Path
            fill={colorPalette[3]}
            d="M6.187 8h11.625l-.695 11.125A2 2 0 0 1 15.121 21H8.879a2 2 0 0 1-1.996-1.875zM19 5v2H5V5h3V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1zm-9 0h4V4h-4z"
         />
      </Svg>
   );
}
