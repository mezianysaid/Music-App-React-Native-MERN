module.exports = {
  preset: 'react-native',
  plugins: [
    [
      'expo-media-library',
      {
        photosPermission: 'Allow $(PRODUCT_NAME) to access your photos.',
        savePhotosPermission: 'Allow $(PRODUCT_NAME) to save photos.',
        isAccessMediaLocationEnabled: true,
      },
    ],
  ],
};
