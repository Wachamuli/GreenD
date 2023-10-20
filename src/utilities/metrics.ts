import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Usage: marginLeft, paddingRight, etc.
const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
// Usage: marginTop, paddingBottom, etc.
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
// Usage: fontSize, borderRadius, etc.
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { width, height, horizontalScale, verticalScale, moderateScale };