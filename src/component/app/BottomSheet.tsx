import React, {forwardRef, useMemo, Ref} from 'react';
import {View, Text} from 'react-native';
import BottomSheet, {BottomSheetProps, BottomSheetBackdrop} from '@gorhom/bottom-sheet';

interface BottomSheetComponentProps {
  children: React.ReactNode;
}

const BottomSheetComponent = forwardRef<BottomSheetProps, BottomSheetComponentProps>(
  ({children}, ref) => {
    const snapPoints = useMemo(() => ['30%', '50%', '75%'], []);

    return (
      <>
        <BottomSheet
          ref={ref}
          index={-1}
          snapPoints={snapPoints}
          backdropComponent={(backdropProps) => (
            <>
              <BottomSheetBackdrop
                {...backdropProps}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                enableTouchThrough={true}
              />
            </>
          )}>
          {children}
        </BottomSheet>
      </>
    );
  },
);

export default BottomSheetComponent;
