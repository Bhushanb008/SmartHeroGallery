import React, { useState } from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { buildImageSources } from "../utils/cdn";

interface Props {
  src: string;
}

const ProgressiveImage: React.FC<Props> = ({ src }) => {
  const { preview, processed, original } =
    buildImageSources(src);

  const [currentUri, setCurrentUri] =
    useState<string>(preview);

  const [level, setLevel] = useState<
    "preview" | "processed" | "original" | "done"
  >("preview");

  const handleError = () => {
    if (level === "preview") {
      setCurrentUri(processed);
      setLevel("processed");
    } else if (level === "processed") {
      setCurrentUri(original);
      setLevel("original");
    } else {
      setLevel("done");
    }
  };

  return (
//     <Image
//       style={styles.image}
//       resizeMode="cover"
//     />
    <FastImage
      style={styles.image}
      source={{
        uri: currentUri,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }}
      resizeMode={FastImage.resizeMode.cover}
      onError={handleError}
    />
  );
};

export default React.memo(ProgressiveImage);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});