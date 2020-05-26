import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, { db } from '../../../firebase';
import { makeStyles } from '@material-ui/core';
import { Input } from './Input';
import { Tree } from 'antd';
import 'antd/lib/tree/style/index.css';
import DeleteDialog from '../UI/DeleteDialog';

const useStyles = makeStyles(theme => ({
  treeContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    marginTop: 10,
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  treeItemContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center'
  }
}));

export const CategoryForm = () => {
  const classes = useStyles();

  const [categories = [], loadingCategories] = useCollectionData(
    db.collection('jobCategories').orderBy('name', 'asc'),
    { idField: 'id' }
  );

  // Tree view state
  const [expandedKeys, setExpandedKeys] = React.useState([]);
  const [selectedKeys, setSelectedKeys] = React.useState([]);
  const [autoExpandParent, setAutoExpandParent] = React.useState(true);
  const [openDelete, setOpenDelete] = useState(false);

  const tree = categories.reduce(categoryToNode, []);
  const selectedCategory = categories.find(c => c.id === selectedKeys[0]);

  // Used to fold a list of categories into a tree
  function categoryToNode(tree, category) {
    const node = {
      title: category.name,
      key: category.id
    };

    if (category.hasChildren && !category.parentID) {
      node.children = category.childrenById
        .map(childId => {
          const { id, hasChildren, childrenById, name } = categories.find(
            cat => cat.id === childId
          );
          return { id, hasChildren, childrenById, name };
        })
        .reduce(categoryToNode, []);

      return [...tree, node];
    }

    if (!category.parentID) {
      return [...tree, node];
    }

    return tree;
  }

  // Used to decode a node tree into a categories list for saving in Firestore
  const nodeToCategory = (cats, node) => {
    const category = {
      id: node.key,
      name: node.title,
      hasChildren: false,
      parentID: node.parentID ? node.parentID : ''
    };

    if (node.children) {
      category.childrenById = node.children.map(c => c.key);
      category.hasChildren = true;
      cats = [
        ...cats,
        ...node.children.reduce((ac, child) => {
          const withParent = { ...child, parentID: node.key };
          return nodeToCategory(ac, withParent);
        }, [])
      ];
    }

    return [...cats, category];
  };

  // Saves the current structure of the tree to Firestore, designed to be called
  // after a category is moved from one place to another in the tree
  const saveTree = newTree => {
    const newCategories = newTree.reduce(nodeToCategory, []);

    const categoriesToUpdate = newCategories.filter(newCategory => {
      const oldCategory = categories.find(
        oldCategory => oldCategory.id === newCategory.id
      );

      // Category changed parents
      if (oldCategory.parentID !== newCategory.parentID) {
        return true;
      }

      // Didn't change parents, but is a leaf, so we're immediately done
      if (oldCategory && !oldCategory.hasChildren && !newCategory.hasChildren) {
        return false;
      }

      // Category gained children
      if (oldCategory && !oldCategory.hasChildren && newCategory.hasChildren) {
        return true;
      }

      // Category lost children
      if (oldCategory && oldCategory.hasChildren && !newCategory.hasChildren) {
        return true;
      }

      // Category changed children
      const childrenRemoved = oldCategory.childrenById.some(
        oldChild => !newCategory.childrenById.find(c => c === oldChild)
      );
      const childrenAdded = newCategory.childrenById.some(
        newChild => !oldCategory.childrenById.find(c => c === newChild)
      );
      if (childrenRemoved || childrenAdded) {
        return true;
      }

      return false;
    });

    const batch = db.batch();
    categoriesToUpdate.forEach(
      ({ id, name, hasChildren, childrenById, parentID }) => {
        const ref = db.collection('jobCategories').doc(id);

        batch.set(ref, {
          name,
          hasChildren: hasChildren ? hasChildren : false,
          childrenById: childrenById ? childrenById : [],
          parentID
        });
      }
    );

    batch
      .commit()
      .then(() => {
        console.log('Committed Successfully!');
      })
      .catch(e => {
        throw Error(e);
      });
  };

  // Adds a category to Firestore
  const addCategory = input => {
    if (input.length < 1) return;

    db.collection('jobCategories')
      .doc(input.toLowerCase().replace(/\s/g, ''))
      .set({
        name: input,
        hasChildren: false,
        childrenById: [],
        parentID: ''
      })
      .catch(err => {
        console.error('Error adding Category: ', err);
      });
  };

  // Removes a category from Firestore
  const deleteCategory = () => {
    const batch = db.batch();

    // Delete the category
    const doc = db.collection('jobCategories').doc(selectedCategory.id);
    batch.delete(doc);

    // Remove the category as a child from its parent, if it has one
    let parent;
    if (selectedCategory.parentID)
      parent = db.collection('jobCategories').doc(selectedCategory.parentID);

    if (parent) {
      batch.update(parent, {
        childrenById: firebase.firestore.FieldValue.arrayRemove(
          selectedCategory.id
        )
      });
    }

    // Reassign the categories children to its parent
    const children = selectedCategory.childrenById.map(childId =>
      db.collection('jobCategories').doc(childId)
    );

    children.forEach(child => {
      batch.update(child, {
        parentID: selectedCategory.parentID
      });
    });

    // Send the changes as a single batch, to prevent race conditions
    batch
      .commit()
      .then(() => {
        console.log('Committed Successfully!');
      })
      .catch(e => {
        throw Error(e);
      });
  };

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeys, info) => {
    setOpenDelete(true);
    setSelectedKeys(selectedKeys);
  };

  const onDragEnter = info => {};

  const onDrop = info => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const traverse = (root, key, callback) => {
      for (let i = 0; i < root.length; i++) {
        if (root[i].key === key) {
          return callback(root[i], i, root);
        }
        if (root[i].children) {
          traverse(root[i].children, key, callback);
        }
      }
    };

    const newTree = [...tree];

    // Find dragObject
    let dragObj;
    traverse(newTree, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      traverse(newTree, dropKey, item => {
        item.children = item.children || [];
        // where to insert
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      traverse(newTree, dropKey, item => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      traverse(newTree, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    saveTree(newTree);
  };

  return (
    <>
      <DeleteDialog
        open={openDelete}
        setClose={() => setOpenDelete(false)}
        onConfirm={deleteCategory}
        label={selectedCategory ? selectedCategory.name : ''}
        message="Are you sure you would like to remove this category?"
      />

      <Input placeholder="Add a Category" onSubmit={addCategory} />
      <div className={classes.treeContainer}>
        <Tree
          draggable
          onDragEnter={onDragEnter}
          onDrop={onDrop}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={tree}
        />
      </div>
    </>
  );
};
