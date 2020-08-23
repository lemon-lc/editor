import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Tree } from 'antd';
import { useSelector } from 'react-redux';
import routes from '../constants/routes.json';
import styles from './Home.css';
import { selectTree } from '../reducer/tree';

const { TreeNode, DirectoryTree } = Tree;

const renderTreeNode = (data: any[]): any[] => {
  return data.map(item => {
    if (Array.isArray(item.children)) {
      return (
        <TreeNode title={item.filename} key={item.filepath}>
          {renderTreeNode(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.filename} isLeaf key={item.filepath} />;
  });
};

const Home: React.FC = () => {
  const tree = useSelector(selectTree);
  const onSelect = (keys: any, event: any) => {
    console.log('Trigger Select', keys, event);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };
  console.log(tree, 'tree data');
  return (
    <div className={styles.container} data-tid="container">
      <DirectoryTree multiple defaultExpandAll onSelect={onSelect} onExpand={onExpand}>
        {renderTreeNode(tree)}
      </DirectoryTree>
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
};

export default Home;
