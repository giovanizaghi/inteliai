import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ColProps {
  children?: ReactNode;
  MD?: number;
  spaceBetween?: boolean;
  alignItems?: ViewStyle['alignItems'];
  
}

const Col: React.FC<ColProps> = ({ children, MD, spaceBetween, alignItems }) => {
  const colStyles: ViewStyle = {
    flexDirection: 'column',
  };

  if (MD) {
    colStyles.flex = MD;
  }

  if (spaceBetween) {
    colStyles.justifyContent = 'space-between';
  }

  if (alignItems) {
    colStyles.alignItems = alignItems;
  }

  return <View style={[styles.col, colStyles]}>{children}</View>;
};

const styles = StyleSheet.create({
  col: {
    flex: 1,
  },
});

export default Col;
