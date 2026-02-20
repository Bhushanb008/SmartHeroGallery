import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native";

import { useGalleryData } from "../hooks/useGalleryData";
import { buildPages } from "../utils/buildPages";
import { PageLayout, GalleryItem } from "../utils/types";
import GalleryPage from "../components/GalleryPage";
import PageIndicator from "../components/PageIndicator";
import FirstPageNudge from "../components/FirstPageNudge";
import FullscreenCarousel from "../components/FullscreenCarousel";
import { PAGE_WIDTH } from "../constants/layout";
import { useViewability } from "../hooks/useViewability";
import { usePrefetch } from "../hooks/usePrefetch";

const SmartHeroGallery: React.FC = () => {
  const { data, loading, error } = useGalleryData();

  const pages = useMemo(() => {
    if (!data?.length) return [];
    return buildPages(data, { lookahead: 12 });
  }, [data]);

  const flatListRef = useRef<FlatList<PageLayout>>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  
  const { viewabilityConfig, onViewableItemsChanged } =
    useViewability(setCurrentIndex);

  
  usePrefetch(pages, currentIndex);

  const handleItemPress = useCallback(
    (pageIndex: number, tilePosition: number) => {
      const page = pages[pageIndex];
      if (!page) return;

      let selectedItem: GalleryItem | undefined;

      if (tilePosition === 0) selectedItem = page.left;
      if (tilePosition === 1) selectedItem = page.rightTop;
      if (tilePosition === 2) selectedItem = page.rightBottom;

      const globalIndex = data.findIndex(
        (item) => item._id === selectedItem?._id
      );

      setModalIndex(globalIndex >= 0 ? globalIndex : 0);
      setModalVisible(true);
    },
    [pages, data]
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<PageLayout>) => {
      return (
        <GalleryPage
          page={item}
          index={index}
          currentIndex={currentIndex}
          onItemPress={handleItemPress}
        />
      );
    },
    [currentIndex, handleItemPress]
  );

  const scrollToNextPage = useCallback(() => {
    flatListRef?.current?.scrollToIndex({
      index: 1,
      animated: true,
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={pages}
        horizontal
        pagingEnabled
        snapToInterval={PAGE_WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: PAGE_WIDTH,
          offset: PAGE_WIDTH * index,
          index,
        })}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        windowSize={5}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        removeClippedSubviews
      />

      <PageIndicator
        total={pages.length}
        current={currentIndex}
      />

      <FirstPageNudge
        visible={currentIndex === 0}
        onPress={scrollToNextPage}
      />

      <FullscreenCarousel
        visible={modalVisible}
        items={data}
        initialIndex={modalIndex}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default SmartHeroGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
