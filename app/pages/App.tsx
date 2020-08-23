import React, { ReactNode, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'react-redux';
import { updateTree } from '../reducer/tree';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    ipcRenderer.send('editor-message', { code: 'fileTree' });
    ipcRenderer.on('fileTree', (event, data) => {
      console.log(data, 11111111111); // Prints "whoooooooh!"
      dispatch(updateTree(data));
    });
  }, []);
  return <>{children}</>;
}
