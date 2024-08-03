interface IconsProps {
  width: number;
  fill: string;
  className: string;
  onClick: () => void;
}

export function LeftArrow(props: IconsProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={props.width}
      fill={props.fill}
      className={props.className}
      onClick={() => props.onClick()}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <title>arrow-left</title>
        <g id="Page-1" strokeWidth="1" fillRule="evenodd">
          <g id="add" transform="translate(106.680107, 134.255147)">
            <polygon
              id="arrow-left"
              points="298.639787 100.41664 81.66656 100.41664 151.916587 30.1666133 121.749973 0 1.42108547e-14 
              121.749973 121.749973 243.489707 151.916587 213.32288 81.6693333 143.083307 298.639787 143.083307"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function RightArrow(props: IconsProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={props.width}
      fill={props.fill}
      className={props.className}
      onClick={() => props.onClick()}
    >
      <g id="SVGRepo_iconCarrier">
        <title>arrow-right</title>
        <g id="Page-1" strokeWidth="1" fillRule="evenodd">
          <g id="add" transform="translate(106.680107, 134.255147)">
            <polygon
              id="arrow-right"
              points="1.42108547e-14 143.073067 216.973013 143.073067 146.7232 213.32288 176.889813 243.489707 
              298.639787 121.739733 176.889813 0 146.7232 30.1668267 216.970453 100.4064 1.42108547e-14 100.4064"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function CheckMark(props: IconsProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      width={props.width}
      className={props.className}
      onClick={() => props.onClick()}
    >
      <path
        d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472 
        c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"
      ></path>
      <path
        fill={props.fill}
        d="M256,128c-70.688,0-128,57.312-128,128s57.312,128,128,128s128-57.312,128-128S326.688,128,256,128z 
        M240,320l-48-48 l22.398-25.594L240,272l72-80l24,25.594L240,320z"
      ></path>
    </svg>
  );
}
