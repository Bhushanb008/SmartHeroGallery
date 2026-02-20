import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { GalleryItem } from "../utils/types";
import ProgressiveImage from "./ProgressiveImage";
import ProgressiveVideo from "./ProgressiveVideo";


interface Props {
  item: GalleryItem;
  onPress: () => void;
  isActive: boolean;
  style: any;
}

const MediaTile: React.FC<Props> = ({
  item,
  onPress,
  isActive,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {item.type === "image" ? (
        <ProgressiveImage src={item.src} />
      ) : (
        <ProgressiveVideo
          src={item.src}
          isActive={isActive}
        />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(MediaTile);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 12,
    marginRight:1,
  },
});
