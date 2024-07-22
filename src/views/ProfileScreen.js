// src/views/ProfileScreen.js
import React from 'react';
import { useAtom } from 'jotai';
import { YStack, H1 } from 'tamagui';
import { primaryColorAtom, fontSizeAtom } from '../store/settingsAtoms';

const ProfileScreen = () => {
  const [primaryColor] = useAtom(primaryColorAtom);
  const [fontSize] = useAtom(fontSizeAtom);

  return (
    <YStack f={1} ai="center" jc="center" p="$4" space="$4">
      <H1 style={{ color: primaryColor, fontSize }}>Profile Screen</H1>
    </YStack>
  );
};

export default ProfileScreen;
