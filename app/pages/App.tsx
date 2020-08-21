import React, { ReactNode } from 'react';
import { ipcRenderer } from 'electron';

type Props = {
  children: ReactNode;
};

require('electron').ipcRenderer.on('ping', function (event, message) {
  console.log(message, 11111111111); // Prints "whoooooooh!"
});

export default function App(props: Props) {
  const { children } = props;
  return <>{children}</>;
}
