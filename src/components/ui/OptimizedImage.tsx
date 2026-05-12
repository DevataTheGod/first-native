import React, { useEffect, useState } from 'react';

interface ImageProps {
  uri?: string;
  defaultSource?: any;
  style?: any;
}

export const OptimizedImage: React.FC<ImageProps> = ({ uri, defaultSource, style }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (uri) {
      setLoaded(false);
      setError(false);
    }
  }, [uri]);

  if (!uri || error) {
    return (
      <View style={[styles.placeholder, style]}>
        <Text style={styles.placeholderText}>📷</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!loaded && (
        <View style={[styles.loading, style]}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      <Image
        source={{ uri }}
        style={[style, !loaded && styles.hidden]}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        resizeMode="cover"
      />
    </View>
  );
};

import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { position: 'relative' },
  placeholder: { backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  placeholderText: { fontSize: 32 },
  loading: { position: 'absolute', backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#666' },
  hidden: { opacity: 0 },
});
