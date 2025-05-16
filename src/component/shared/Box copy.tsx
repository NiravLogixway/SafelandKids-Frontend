import styled from 'styled-components/native';

export interface BoxProps {
  children?: React.ReactNode;
  component?: React.ElementType;
  display?: 'flex' | 'inline' | 'inline-flex';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: 'auto' | number;
  width?: string | number;
  height?: string | number;
  m?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  mx?: string | number;
  my?: string | number;
  p?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  px?: string | number;
  py?: string | number;
  bgcolor?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderColor?: string;
  borderRadius?: string | number;
  boxShadow?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string | number;
  fontStyle?: 'normal' | 'italic';
  fontWeight?: 'initial' | 'inherit' | 'bold' | 'normal' | number | 'lighter' | 'bolder';
  letterSpacing?: string;
  lineHeight?: string | number;
  textAlign?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  textDecoration?: 'none' | 'underline' | 'line-through' | 'overline';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  opacity?: number;
  overflow?: 'auto' | 'hidden' | 'scroll' | 'visible';
  whiteSpace?: 'nowrap' | 'normal' | 'pre';
  visibility?: 'hidden' | 'visible';
  boxSizing?: 'content-box' | 'border-box';
  gridColumn?: string;
  gridRow?: string;
  gridAutoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
  gridAutoColumns?: string;
  gridAutoRows?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  gridArea?: string;
  justifySelf?: 'center' | 'end' | 'start' | 'stretch';
  alignSelf?: 'center' | 'end' | 'start' | 'stretch';
  order?: number;
}

const Box = styled.View<BoxProps>`
  display: ${({display}) => display ?? 'flex'};
  flex-direction: ${({flexDirection}) => flexDirection ?? 'row'};
  justify-content: ${({justifyContent}) => justifyContent ?? 'flex-start'};
  align-items: ${({alignItems}) => alignItems ?? 'center'};
  flex-wrap: ${({flexWrap}) => flexWrap ?? 'nowrap'};
  flex-grow: ${({flexGrow}) => flexGrow ?? 0};
  flex-shrink: ${({flexShrink}) => flexShrink ?? 1};
  flex-basis: ${({flexBasis}) => flexBasis ?? 'auto'};
  width: ${({width}) => width ?? 'auto'};
  height: ${({height}) => height ?? 'auto'};
  margin: ${({m}) => m ?? 0};
  margin-top: ${({mt}) => mt ?? 'auto'};
  margin-bottom: ${({mb}) => mb ?? 'auto'};
  margin-left: ${({ml}) => ml ?? 'auto'};
  margin-right: ${({mr}) => mr ?? 'auto'};
  margin-x: ${({mx}) => mx ?? 'auto'};
  margin-y: ${({my}) => my ?? 'auto'};
  padding: ${({p}) => p ?? 0};
  padding-top: ${({pt}) => pt ?? 'auto'};
  padding-bottom: ${({pb}) => pb ?? 'auto'};
  padding-left: ${({pl}) => pl ?? 'auto'};
  padding-right: ${({pr}) => pr ?? 'auto'};
  padding-x: ${({px}) => px ?? 'auto'};
  padding-y: ${({py}) => py ?? 'auto'};
  background-color: ${({bgcolor}) => bgcolor ?? 'transparent'};
  border: ${({border}) => border ?? 'none'};
  border-top: ${({borderTop}) => borderTop ?? 'none'};
  border-right: ${({borderRight}) => borderRight ?? 'none'};
  border-bottom: ${({borderBottom}) => borderBottom ?? 'none'};
  border-left: ${({borderLeft}) => borderLeft ?? 'none'};
  border-color: ${({borderColor}) => borderColor ?? 'currentColor'};
  border-radius: ${({borderRadius}) => borderRadius ?? '0'};
  box-shadow: ${({boxShadow}) => boxShadow ?? 'none'};
  color: ${({color}) => color ?? 'currentColor'};
  font-family: ${({fontFamily}) => fontFamily ?? 'inherit'};
  font-size: ${({fontSize}) => fontSize ?? '14px'};
  font-style: ${({fontStyle}) => fontStyle ?? 'normal'};
  font-weight: ${({fontWeight}) => fontWeight ?? 'normal'};
  letter-spacing: ${({letterSpacing}) => letterSpacing ?? 'normal'};
  line-height: ${({lineHeight}) => lineHeight ?? 'normal'};
  text-align: ${({textAlign}) => textAlign ?? 'inherit'};
  text-decoration: ${({textDecoration}) => textDecoration ?? 'none'};
  text-transform: ${({textTransform}) => textTransform ?? 'none'};
  opacity: ${({opacity}) => opacity ?? 1};
  overflow: ${({overflow}) => overflow ?? 'visible'};
  white-space: ${({whiteSpace}) => whiteSpace ?? 'normal'};
  visibility: ${({visibility}) => visibility ?? 'visible'};
  box-sizing: ${({boxSizing}) => boxSizing ?? 'content-box'};
  grid-column: ${({gridColumn}) => gridColumn ?? 'auto'};
  grid-row: ${({gridRow}) => gridRow ?? 'auto'};
  grid-auto-flow: ${({gridAutoFlow}) => gridAutoFlow ?? 'row'};
  grid-auto-columns: ${({gridAutoColumns}) => gridAutoColumns ?? 'auto'};
  grid-auto-rows: ${({gridAutoRows}) => gridAutoRows ?? 'auto'};
  grid-template-columns: ${({gridTemplateColumns}) => gridTemplateColumns ?? 'none'};
  grid-template-rows: ${({gridTemplateRows}) => gridTemplateRows ?? 'none'};
  grid-template-areas: ${({gridTemplateAreas}) => gridTemplateAreas ?? 'none'};
  grid-area: ${({gridArea}) => gridArea ?? 'auto'};
  justify-self: ${({justifySelf}) => justifySelf ?? 'auto'};
  align-self: ${({alignSelf}) => alignSelf ?? 'auto'};
  order: ${({order}) => order ?? 0};
`;

export default Box;
