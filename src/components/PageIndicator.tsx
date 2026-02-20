import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
  total: number;
  current: number;
}

const PageIndicator: React.FC<Props> = ({ total, current }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === current && styles.active,
          ]}
        />
      ))}
    </View>
  );
};

export default React.memo(PageIndicator);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 16,
    backgroundColor: "#807e7e",
    marginHorizontal: 4,
  },
  active: {
    backgroundColor: "#000",
  },
});
