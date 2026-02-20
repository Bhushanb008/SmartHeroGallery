import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import { buildVideoSources } from '../utils/cdn';
import ProgressiveImage from './ProgressiveImage';

interface Props {
  src: string;
  isActive: boolean;
}

const ProgressiveVideo: React.FC<Props> = ({ src, isActive }) => {
  const { videoProcessed, videoOriginal, thumbPreview } =
    buildVideoSources(src);

  const [currentUri, setCurrentUri] = useState<string>(videoProcessed);
  const [level, setLevel] = useState<'processed' | 'original' | 'failed'>('processed');

  const [loading, setLoading] = useState(true);

  const handleError = () => {
    if (level === 'processed') {
      setCurrentUri(videoOriginal);
      setLevel('original');
    } else {
      setLevel('failed');
    }
  };

  return (
    <View style={styles.container}>

      {/* thumbPreview */}

      {!isActive && <ProgressiveImage src={thumbPreview} />} 



      {isActive && level !== 'failed' && (
        <>
          <Video
            source={{ uri: currentUri }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            repeat
            paused={!isActive}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            onError={handleError}
            ignoreSilentSwitch="ignore"
          />

          {loading && <ActivityIndicator style={styles.loader} />}
        </>
      )}


      {level === 'failed' && (
        <View style={styles.retry}>
          <Text style={{ color: '#fff' }}>Video unavailable</Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(ProgressiveVideo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
  },
  retry: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
