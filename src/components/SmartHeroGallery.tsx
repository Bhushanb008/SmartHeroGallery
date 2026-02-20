import React, { useMemo, useRef, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useGalleryData } from "../hooks/useGalleryData";
import { buildPages } from "../utils/buildPages";
import GalleryPage from "../components/GalleryPage";
import { PAGE_WIDTH } from "../constants/layout";
import { useViewability } from "../hooks/useViewability";
import { usePrefetch } from "../hooks/usePrefetch";
import PageIndicator from "../components/PageIndicator";
import FirstPageNudge from "../components/FirstPageNudge";
import FullscreenCarousel from "../components/FullscreenCarousel";

const SmartHeroGallery = () => {
  const { data, loading } = useGalleryData();

  const pages = useMemo(
    () => buildPages(data, { lookahead: 12 }),
    [data]
  );

  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { viewabilityConfig, onViewableItemsChanged } =
    useViewability(setCurrentIndex);

  usePrefetch(pages, currentIndex);

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={pages}
        horizontal
        pagingEnabled
        snapToInterval={PAGE_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <GalleryPage
            page={item}
            index={index}
            currentIndex={currentIndex}
            onItemPress={() => setModalVisible(true)}
          />
        )}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <PageIndicator
        total={pages.length}
        current={currentIndex}
      />

      <FirstPageNudge
        visible={currentIndex === 0}
        onPress={() =>
          flatListRef?.current?.scrollToIndex({
            index: 1,
            animated: true,
          })
        }
      />

      <FullscreenCarousel
        visible={modalVisible}
        items={data}
        initialIndex={0}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default SmartHeroGallery;

const styles = StyleSheet.create({});
