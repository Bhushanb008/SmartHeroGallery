import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { GalleryItem } from '../utils/types';
import ProgressiveImage from './ProgressiveImage';
import ProgressiveVideo from './ProgressiveVideo';

interface Props {
  visible: boolean;
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const FullscreenCarousel: React.FC<Props> = ({
  visible,
  items,
  initialIndex,
  onClose,
}) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (visible && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          
          index: initialIndex,

          animated: false,
        });
      }, 50);
    }
  }, [visible, initialIndex]);

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={items}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item._id}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScrollToIndexFailed={info => {
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({
                
                index: info.index,
                animated: false,
              });
            }, 200);
          }}
          renderItem={({ item }) => (
            <View style={{ width, height }}>
              {item.type === 'image' ? (
                <ProgressiveImage src={item.src} />
              ) : (
                <ProgressiveVideo src={item.src} isActive={true} />
              )}
            </View>
          )}
        />



        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={{ color: '#fff' }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FullscreenCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeBtn: {
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 20,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 40,
    marginRight: 20,
  },
});
