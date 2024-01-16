import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface RowProps {
  children?: ReactNode;
  MD?: number;
  spaceBetween?: boolean;
  justifyContent?: ViewStyle['justifyContent'];
  style?: ViewStyle;
}

const Row: React.FC<RowProps> = ({ children, MD, spaceBetween, justifyContent, style }) => {
  const rowStyles: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  if (MD) {
    rowStyles.flex = MD;
  }

  if (spaceBetween) {
    rowStyles.justifyContent = 'space-between';
  }

  if (justifyContent) {
    rowStyles.justifyContent = justifyContent;
  }

  return <View style={[styles.row, rowStyles, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
  },
});

export default Row;
