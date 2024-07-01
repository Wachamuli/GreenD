import { useLayoutEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

import { ColorPalette } from "../styles/colorPalette";
import { useTimer } from "../hooks/useTimer";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";

const { width: screenWidth } = Dimensions.get("screen");

const Carousel = ({ images }: { images: string[] }) => {
  const carouselRef = useRef<FlatList>(null);
  const { counter, resetCounter } = useTimer(5);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffeset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(xOffeset / screenWidth);
    console.log(currentIndex);
    setCurrentIndex(currentIndex);
  };

  useLayoutEffect(() => {
    if (counter > 1) return;

    if (currentIndex === images.length - 1) {
      carouselRef.current?.scrollToIndex({ index: 0 });
      return;
    }

    carouselRef.current?.scrollToIndex({ index: currentIndex + 1 });

    resetCounter();
  }, [counter]);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={carouselRef}
        data={images}
        onScroll={handleScroll}
        getItemLayout={(_, index) => ({
          index: index,
          length: screenWidth,
          offset: screenWidth * index,
        })}
        renderItem={({ item: dealBanner, index }) => (
          <View style={styles.imageContainer}>
            <Image
              key={index}
              source={{ uri: dealBanner }}
              style={styles.imageDimensions}
            />
          </View>
        )}
      />

      <View style={styles.indexesContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indexIndicators,
              {
                borderColor:
                  index === currentIndex
                    ? ColorPalette.accent
                    : ColorPalette.tertiary,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(20),
    overflow: "hidden",
  },
  imageContainer: {
    height: verticalScale(80),
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  imageDimensions: {
    height: verticalScale(80),
    width: screenWidth,
  },
  indexesContainer: {
    marginTop: verticalScale(5),
    justifyContent: "center",
    flexDirection: "row",
  },
  indexIndicators: {
    width: moderateScale(5),
    height: moderateScale(5),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(4),
    marginHorizontal: horizontalScale(2),
  },
});

export default Carousel;
